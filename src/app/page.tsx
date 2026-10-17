import Link from 'next/link';
import type { Route } from 'next';

import { siteConfig } from '@/config/app/site';
import { Badge } from '@/components/ui/badge';
import { buttonStyles } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  BuildingIcon,
  ChevronRightIcon,
  FileTextIcon,
  MapPinIcon,
  ShieldAlertIcon,
  SlidersIcon,
} from '@/components/ui/icons';

const workflowSteps = [
  {
    step: '01',
    label: 'IDENTIFY',
    title: 'Find hazard areas',
    desc: 'View places that may be affected by flooding, landslides, coastal hazards, and other events.',
  },
  {
    step: '02',
    label: 'ASSESS',
    title: 'Understand community needs',
    desc: 'Review local information to see who may need extra help during an emergency.',
  },
  {
    step: '03',
    label: 'PRIORITIZE',
    title: 'Set priorities',
    desc: 'Use clear risk levels to help teams decide which communities to check on first.',
  },
  {
    step: '04',
    label: 'MATCH',
    title: 'Compare safer places',
    desc: 'Compare potential places to stay, including space and access to essential services.',
  },
  {
    step: '05',
    label: 'SIMULATE',
    title: 'Explore what-if plans',
    desc: 'Consider how heavier rain or changing conditions could affect local risks and response needs.',
  },
  {
    step: '06',
    label: 'DECIDE',
    title: 'Plan next steps',
    desc: 'Create clear summaries of community needs, response plans, and safer location options.',
  },
];

interface CapabilityItem {
  icon: typeof MapPinIcon;
  title: string;
  desc: string;
  link: Route;
  action: string;
  color: string;
  bg: string;
  badge: string;
}

const capabilities: CapabilityItem[] = [
  {
    icon: MapPinIcon,
    title: 'Hazard map',
    desc: 'See areas exposed to hazards, nearby communities, and important response locations.',
    link: '/map',
    action: 'Open hazard map →',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    badge: 'GIS LAYER',
  },
  {
    icon: ShieldAlertIcon,
    title: 'Community risk',
    desc: 'Review which communities may need attention and understand the factors behind their risk level.',
    link: '/habitations',
    action: 'Review communities →',
    color: 'text-red-600',
    bg: 'bg-red-50',
    badge: 'TRIAGE',
  },
  {
    icon: BuildingIcon,
    title: 'Safer places',
    desc: 'Compare potential receiving areas, available services, and the number of people they can support.',
    link: '/relocation',
    action: 'Compare places →',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    badge: 'CAPACITY',
  },
  {
    icon: SlidersIcon,
    title: 'What-if planning',
    desc: 'Explore how changing rainfall and hazard conditions could affect community safety and response needs.',
    link: '/scenarios',
    action: 'Explore scenarios →',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    badge: 'SIMULATION',
  },
  {
    icon: FileTextIcon,
    title: 'Reports',
    desc: 'Create clear summaries of current risks, response plans, and relocation options.',
    link: '/reports',
    action: 'Generate Reports →',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    badge: 'REPORTING',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-8 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 sm:gap-16">
        {/* 1. Top Command Header Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/95 px-6 py-4 shadow-subtle backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs ring-1 ring-white/20">
              <span className="font-mono text-xs font-black tracking-wider">R</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  RESILIENCE
                </span>
                <span className="rounded-sm bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-slate-700 ring-1 ring-slate-200">
                  COMMUNITY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Disaster management & community safety
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <Badge variant="info">{siteConfig.problemCode}</Badge>
            <Badge variant="outline">{siteConfig.phaseLabel}</Badge>
            <Link
              className={buttonStyles({ size: 'sm', variant: 'primary' })}
              href="/dashboard"
            >
              View overview →
            </Link>
          </div>
        </header>

        {/* 2. Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-12 lg:p-14 shadow-card">
          {/* Subtle Atmospheric Glows (CarbonTwin style) */}
          <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-blue-600/5 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 size-96 rounded-full bg-blue-600/4 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/70 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-900 shadow-2xs">
              <span className="size-1.5 rounded-full bg-blue-600" />
              DISASTER PREPAREDNESS · COMMUNITY SAFETY · RESPONSE PLANNING
            </div>

            {/* Main Dominant Heading */}
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl sm:leading-[1.15]">
              Understand risk. <span className="text-blue-600">Plan a safer response.</span>
            </h1>

            {/* Subtitle Description */}
            <p className="mx-auto max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600">
              A practical workspace for local teams and communities to understand hazard exposure, identify people who may need support, coordinate response, and plan safer places to live.
            </p>

            {/* 5 Capability Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs">
                <span className="size-2 rounded-full bg-blue-600" />
                Explore hazard areas
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs">
                <span className="size-2 rounded-full bg-red-600" />
                Understand community risk
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs">
                <span className="size-2 rounded-full bg-emerald-600" />
                Compare safer places
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs">
                <span className="size-2 rounded-full bg-amber-600" />
                Plan for changing conditions
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs">
                <span className="size-2 rounded-full bg-indigo-600" />
                Prepare clear reports
              </span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <Link className={buttonStyles({ size: 'md', variant: 'primary' })} href="/dashboard">
                Open overview <ChevronRightIcon className="size-4" />
              </Link>
              <Link className={buttonStyles({ size: 'md', variant: 'secondary' })} href="/map">
                <MapPinIcon className="size-3.5" />
                Explore hazard map
              </Link>
              <Link className={buttonStyles({ size: 'md', variant: 'outline' })} href="/login">
                Choose a role
              </Link>
            </div>

            {/* Quick Platform Stats */}
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 pt-6 border-t border-slate-100 sm:grid-cols-4 text-center">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 shadow-2xs">
                <span className="tabnum font-bold text-slate-900 block text-base sm:text-lg">7 Settlements</span>
                <span className="text-[11px] text-slate-500 font-medium">Field Surveyed</span>
              </div>
              <div className="rounded-2xl border border-red-200/70 bg-red-50/40 p-3 shadow-2xs">
                <span className="tabnum font-bold text-red-700 block text-base sm:text-lg">3 Red Zones</span>
                <span className="text-[11px] text-red-600 font-medium">High-risk areas</span>
              </div>
              <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/40 p-3 shadow-2xs">
                <span className="tabnum font-bold text-emerald-700 block text-base sm:text-lg">7 Relocation Sites</span>
                <span className="text-[11px] text-emerald-700 font-medium">Capacity Audited</span>
              </div>
              <div className="rounded-2xl border border-blue-200/70 bg-blue-50/40 p-3 shadow-2xs">
                <span className="tabnum font-bold text-blue-700 block text-base sm:text-lg">Shared map</span>
                <span className="text-[11px] text-blue-600 font-medium">
                  Common view for all teams
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Decision Workflow / Journey Section (CarbonTwin Style) */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              HOW IT WORKS
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              From early risk awareness to practical action
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-600">
              Find areas of concern, understand who may be affected, and use the available information to plan next steps.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((ws) => (
              <div
                key={ws.step}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-subtle transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-blue-700 ring-1 ring-blue-600/20">
                      STAGE {ws.step}
                    </span>
                    <span className="font-mono text-3xl font-black text-slate-200 transition-colors group-hover:text-blue-200">
                      {ws.step}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {ws.label}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {ws.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {ws.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Deep Navy Feature Section (CarbonTwin Inspired) */}
        <section className="overflow-hidden rounded-3xl border border-[#694f39] bg-[#493526] p-8 sm:p-12 text-white shadow-elevated">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Side Headline */}
            <div className="space-y-4 lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-300">
                <span className="size-1.5 rounded-full bg-blue-400" />
                One shared planning workspace
              </span>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-white leading-tight">
                One clear picture. <br />
                Better prepared teams. <br />
                <span className="text-blue-400">Safer communities.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Bring maps, community needs, response planning, and reports together so teams can understand the situation and coordinate their next steps.
              </p>
              <div className="pt-2">
                <Link className={buttonStyles({ size: 'md', variant: 'primary' })} href="/dashboard">
                  Go to overview →
                </Link>
              </div>
            </div>

            {/* Right Side 5 Subsystem Navy Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
              <div className="rounded-2xl border border-[#1a2d48] bg-[#0d1e35] p-4.5 space-y-1.5 transition-colors hover:border-blue-500/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-blue-400">01</span>
                  <span className="text-[10px] text-slate-400 font-mono">MAP VIEW</span>
                </div>
                <h3 className="text-xs font-bold text-white">GIS Risk Intelligence</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Interactive multi-hazard vector overlay with statutory red zone envelopes and asset inspection.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1a2d48] bg-[#0d1e35] p-4.5 space-y-1.5 transition-colors hover:border-blue-500/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-red-400">02</span>
                  <span className="text-[10px] text-slate-400 font-mono">Σ wi = 1.00</span>
                </div>
                <h3 className="text-xs font-bold text-white">Vulnerability Prioritization</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Clear risk levels help teams decide which communities need attention first.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1a2d48] bg-[#0d1e35] p-4.5 space-y-1.5 transition-colors hover:border-blue-500/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-400">03</span>
                  <span className="text-[10px] text-slate-400 font-mono">15% BUFFER</span>
                </div>
                <h3 className="text-xs font-bold text-white">Safer places</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Compare space and essential services at potential receiving locations.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1a2d48] bg-[#0d1e35] p-4.5 space-y-1.5 transition-colors hover:border-blue-500/40">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-amber-400">04</span>
                  <span className="text-[10px] text-slate-400 font-mono">IMD / IPCC</span>
                </div>
                <h3 className="text-xs font-bold text-white">Climate Stress Simulation</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Real-time precipitation surge and pore pressure scaling projecting escalated settlement demand.
                </p>
              </div>

              <div className="rounded-2xl border border-[#1a2d48] bg-[#0d1e35] p-4.5 space-y-1.5 transition-colors hover:border-blue-500/40 sm:col-span-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-indigo-400">05</span>
                  <span className="text-[10px] text-slate-400 font-mono">CLEAR REPORTS</span>
                </div>
                <h3 className="text-xs font-bold text-white">Reports &amp; exports</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Decision-ready executive summaries, vulnerability dossiers, and A4 resettlement justification orders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Operational Capabilities Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Tools for planning and response
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              5 Integrated Operational Systems
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <Link
                  key={cap.title}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-subtle transition-all duration-150 hover:-translate-y-1 hover:border-slate-300 hover:shadow-card"
                  href={cap.link}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`flex size-9 items-center justify-center rounded-xl ${cap.bg} ${cap.color}`}>
                        <Icon className="size-4.5" />
                      </div>
                      <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400">
                        {cap.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {cap.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                        {cap.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>{cap.action}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 6. Technical Architecture & Deterministic Foundations */}
        <section className="grid gap-4 md:grid-cols-3">
          <Card className="space-y-3 p-6 border border-slate-200/90 shadow-card bg-white rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-600" />
              <h3 className="text-sm font-bold text-slate-900">Deterministic Multi-Criteria Risk</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              Strict 35/25/20/10/10 multi-criteria weighting across hazard intensity, demographic vulnerability, disaster history, exposure, and infrastructure disruption with statutory red zone priority overrides.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <span className="font-mono text-[10px] text-slate-400">Model Weight Invariant: Σ wi = 1.00</span>
            </div>
          </Card>

          <Card className="space-y-3 p-6 border border-slate-200/90 shadow-card bg-white rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Plan for available space</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              Review the space and essential services available at each potential location before planning a move.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <span className="font-mono text-[10px] text-slate-400">Headroom Formula: C_eff = min(C_dim) · 0.85</span>
            </div>
          </Card>

          <Card className="space-y-3 p-6 border border-slate-200/90 shadow-card bg-white rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Team access and planning</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              Team roles, interactive maps, what-if planning, and downloadable summaries support shared planning and response.
            </p>
            <div className="pt-2 border-t border-slate-100">
              <span className="font-mono text-[10px] text-slate-400">Authoritative Provenance: Verified Seed Fixtures</span>
            </div>
          </Card>
        </section>

        {/* 7. Footer Strip */}
        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-6 pb-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Resilience</span>
            <span>·</span>
            <span>Disaster management &amp; community safety</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link className="hover:text-blue-600 transition-colors" href="/dashboard">
              Dashboard
            </Link>
            <Link className="hover:text-blue-600 transition-colors" href="/map">
              GIS Map
            </Link>
            <Link className="hover:text-blue-600 transition-colors" href="/habitations">
              Risk Queue
            </Link>
            <Link className="hover:text-blue-600 transition-colors" href="/relocation">
              Relocation
            </Link>
            <Link className="hover:text-blue-600 transition-colors" href="/scenarios">
              Scenarios
            </Link>
            <Link className="hover:text-blue-600 transition-colors" href="/reports">
              Reports
            </Link>
            <Link className="hover:text-blue-600 transition-colors" href="/login">
              Login
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

