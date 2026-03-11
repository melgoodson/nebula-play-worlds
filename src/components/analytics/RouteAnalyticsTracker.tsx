import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/** Routes to exclude from analytics tracking */
const EXCLUDED_PREFIXES = ["/admin", "/auth"];

/** Minimum ms between inserts for the same path in one session */
const COOLDOWN_MS = 2000;

function getSessionId(): string {
    let sid = sessionStorage.getItem("playiq_session_id");
    if (!sid) {
        sid = crypto.randomUUID();
        sessionStorage.setItem("playiq_session_id", sid);
    }
    return sid;
}

function detectDeviceType(ua: string): string {
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
    if (
        /mobile|iphone|ipod|android.*mobile|windows phone|blackberry|opera mini|iemobile/i.test(
            ua
        )
    )
        return "mobile";
    if (/android|cros|macintosh|windows|linux/i.test(ua)) return "desktop";
    return "unknown";
}

/**
 * Render-less component that tracks page views on public routes.
 * Mount once inside the router + auth providers.
 */
export function RouteAnalyticsTracker() {
    const location = useLocation();
    const { user } = useAuth();
    const lastTracked = useRef<{ path: string; time: number }>({
        path: "",
        time: 0,
    });

    useEffect(() => {
        const { pathname } = location;

        // Skip excluded routes
        if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
            return;
        }

        // Cooldown: don't re-track the same path within COOLDOWN_MS
        const now = Date.now();
        if (
            lastTracked.current.path === pathname &&
            now - lastTracked.current.time < COOLDOWN_MS
        ) {
            return;
        }
        lastTracked.current = { path: pathname, time: now };

        const ua = navigator.userAgent;

        const record = {
            path: pathname,
            title: document.title || null,
            session_id: getSessionId(),
            referrer: document.referrer || null,
            user_agent: ua || null,
            device_type: detectDeviceType(ua),
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            user_id: user?.id ?? null,
        };

        // Fire-and-forget insert
        supabase
            .from("page_views")
            .insert(record)
            .then(({ error }) => {
                if (error) {
                    console.warn("[Analytics] Failed to track page view:", error.message);
                }
            });
    }, [location.pathname, user?.id]);

    return null;
}
