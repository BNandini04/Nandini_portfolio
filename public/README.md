# public/

| File                  | Used by                                                    |
| --------------------- | ---------------------------------------------------------- |
| `profile.jpg`         | Hero photo — centre of the AI orb (desktop), above the name (mobile) |
| `Nandini_Resume.pdf`  | Every "Download Resume" button (nav, hero, contact)         |

Both paths are configured in `data/portfolio.ts` as `profile.avatar` and
`profile.resume` — if you rename either file, update it there too.

`profile.jpg` is 851×1280. The hero frame matches that 2:3 aspect ratio so the
whole photo is visible; if you swap in a photo with a different shape, update
the `aspectRatio` in `components/ai-orb.tsx` and `components/sections/hero.tsx`
to match, or it will crop.
