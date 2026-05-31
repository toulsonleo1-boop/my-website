import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Announcement } from "@/components/announcement"
import { About } from "@/components/about"
import { SiezeRoster } from "@/components/sieze-roster"
import { CommunityLinks } from "@/components/community-links"
import { DiscordRoles } from "@/components/discord-roles"
import { Vip } from "@/components/vip"
import { Shop } from "@/components/shop"
import { Giveaways } from "@/components/giveaways"
import { VoiceChannels } from "@/components/voice-channels"
import { Features } from "@/components/features"
import { Benefits } from "@/components/benefits"
import { Staff } from "@/components/staff"
import { Rules } from "@/components/rules"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <Hero />
        <Announcement />
        <About />
        <SiezeRoster />
        <CommunityLinks />
        <DiscordRoles />
        <Vip />
        <Shop />
        <Giveaways />
        <VoiceChannels />
        <Features />
        <Benefits />
        <Staff />
        <Rules />
      </main>
      <SiteFooter />
    </div>
  )
}
