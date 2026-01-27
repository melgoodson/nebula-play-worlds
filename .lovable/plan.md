

# Blog Page Fix + Modern SEO/AEO Implementation Plan

## Overview
This plan addresses the broken blog route (404) and implements modern Answer Engine Optimization (AEO) tactics to make the PlayIQ website discoverable by AI search engines like ChatGPT, Perplexity, and Google AI Overviews.

---

## Implementation Tasks

### Phase 1: Fix Broken Routes

**1.1 Create Blog Page**
- New file: `src/pages/Blog.tsx`
- Uses Nebula HUD design system (NebulaScene, HUDNav, HUDPanel)
- Initial "Coming Soon" content with launch announcement
- Semantic HTML structure for AEO

**1.2 Create Contact Page**
- New file: `src/pages/Contact.tsx`
- Basic contact information using HUD components
- Fixes the Contact nav link 404

**1.3 Add Routes to App.tsx**
- Import Blog and Contact components
- Add routes: `/blog` and `/contact`

---

### Phase 2: SEO Foundation

**2.1 Update index.html Meta Tags**
- Title: "PlayIQ - STEM Magnetic Building Blocks for Kids"
- Updated meta description with product focus
- PlayIQ-branded Open Graph and Twitter Card tags

**2.2 Enhance robots.txt**
- Explicit allow/disallow rules
- Sitemap reference for future sitemap.xml

---

### Phase 3: AEO Implementation

**3.1 Create llms.txt File**
- New file: `public/llms.txt`
- Markdown format following llmstxt.org specification
- Contains PlayIQ product info, key pages, and FAQ summary
- Entry point for AI crawlers (ChatGPT, Perplexity, etc.)

**3.2 Create FAQ Page with JSON-LD Schema**
- New file: `src/pages/FAQ.tsx`
- LLM-optimized Q&A format using Accordion components
- Injects FAQPage JSON-LD structured data
- Questions cover: product details, safety, age range, compatibility, purchasing

**3.3 Add Product Schema to Product Page**
- Modify: `src/pages/Product.tsx`
- Add Product JSON-LD schema for e-commerce visibility

**3.4 Add FAQ Route**
- Update `src/App.tsx` with `/faq` route

---

## Files to Create
| File | Purpose |
|------|---------|
| `src/pages/Blog.tsx` | Blog listing page |
| `src/pages/FAQ.tsx` | FAQ with JSON-LD schema |
| `src/pages/Contact.tsx` | Contact information |
| `public/llms.txt` | AI discovery file |

## Files to Modify
| File | Changes |
|------|---------|
| `src/App.tsx` | Add Blog, FAQ, Contact routes |
| `index.html` | Update meta tags |
| `public/robots.txt` | Add sitemap reference |
| `src/pages/Product.tsx` | Add Product JSON-LD schema |

---

## Expected Outcomes
- Blog and Contact links will work (no more 404s)
- Site discoverable by AI search engines
- Structured FAQ data helps LLMs answer product questions
- Product schema improves e-commerce visibility
- llms.txt provides curated entry point for AI crawlers

