import { MessageCircle } from "lucide-react"

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-4xl">
            Contact Us
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Have a question or want to get involved? Reach out to the SIEZE team directly.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Discord</p>
                <p className="font-display text-lg font-bold text-foreground">chrxme.gg</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
              S
            </span>
            <span className="font-display text-base font-bold uppercase tracking-wider text-foreground">
              Sieze Community
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SIEZE Community. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
