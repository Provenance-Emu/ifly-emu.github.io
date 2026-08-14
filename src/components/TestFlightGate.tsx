"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import SocialButton, { BmcIcon, PatreonIcon, VenmoIcon, ZelleIcon, OpenCollectiveIcon } from "@/components/SocialButton";

// Main iFly TestFlight link. A previous code pointed to iCube Emu instead—a
// critical bug fixed 2026-08-13. The other two codes in this repo are
// intentionally not interchangeable: dpDcf8Ua bypasses the gate
// (/testflight-patrons/), and 9mbKzrZH is unlisted (/secret/).
const DEFAULT_TESTFLIGHT_URL = "https://testflight.apple.com/join/KTUTErgU";
const TWITTER_URL = "https://x.com/provenanceapp";
const STORAGE_KEY = "ifly_testflight_gate_passed";

// Shared button shapes. The one filled orange button per state is the action
// being asked for; outline and text buttons step down from it.
const btnBase =
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
const btnPrimary =
  "inline-flex items-center justify-center rounded-lg bg-orange-700 px-6 py-3 text-base font-semibold text-white transition hover:ring-2 hover:ring-orange-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
const btnOutline = `${btnBase} border border-gray-500 text-gray-300 hover:bg-white/5 hover:text-white`;
const btnQuiet = `${btnBase} px-2 text-gray-400 underline underline-offset-4 hover:text-gray-200`;

interface TestFlightGateProps {
  testflightUrl?: string;
  skipGate?: boolean;
}

export default function TestFlightGate({ testflightUrl, skipGate }: TestFlightGateProps = {}) {
  const TESTFLIGHT_URL = testflightUrl || DEFAULT_TESTFLIGHT_URL;
  const [gatePassed, setGatePassed] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      setGatePassed(stored === "true" || skipGate === true);
    } catch {}
    setChecking(false);
  }, [skipGate]);

  function markPassed(_method: "follow" | "skip") {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setGatePassed(true);
  }

  return (
    <div className="min-h-screen bg-ink">
      {/* Rendered before the localStorage check resolves, so the page paints its
          header immediately and only the gate card below swaps in. */}
      <PageHeader
        title="Join the iFly TestFlight"
        subtitle="Get early access to iFly builds via Apple TestFlight. Seats may be limited."
      />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* min-h reserves the taller of the two states so resolving the gate
              doesn't shift the sections beneath it. */}
          <div className="min-h-[15rem]">
            {checking ? null : !gatePassed ? (
              <section className="card-glass card-static p-6 md:p-8">
                <h2 className="mb-2 text-xl font-semibold text-white">Help support the project</h2>
                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  Please follow{" "}
                  <a
                    href={TWITTER_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-orange-300 underline underline-offset-4 hover:text-orange-200"
                  >
                    @provenanceapp
                  </a>{" "}
                  on X (Twitter) to stay updated on releases and development. Once followed, click “I followed” below. If you prefer not to follow, you can still proceed.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={TWITTER_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`${btnBase} border border-white/20 bg-black font-semibold text-white hover:bg-neutral-900`}
                  >
                    Follow on X (@provenanceapp)
                  </a>
                  <button type="button" onClick={() => markPassed("follow")} className={btnOutline}>
                    I followed
                  </button>
                  <button type="button" onClick={() => markPassed("skip")} className={btnQuiet}>
                    Proceed without following
                  </button>
                </div>
              </section>
            ) : (
              <section className="card-glass card-static p-6 md:p-8">
                <h2 className="mb-2 text-xl font-semibold text-white">You’re in</h2>
                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  Click below to open the TestFlight invite. If the build is full, try again later.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a href={TESTFLIGHT_URL} target="_blank" rel="noreferrer noopener" className={btnPrimary}>
                    Open TestFlight Invite
                  </a>
                  <Link href="/" className={btnOutline}>
                    Go home
                  </Link>
                </div>
              </section>
            )}
          </div>

          <section className="text-xs leading-relaxed text-gray-400">
            <p>
              Note: Following is optional and not required for access. Your choice is stored locally in your browser.
            </p>
          </section>

          <section className="card-glass card-static p-6 md:p-8">
            <h2 className="mb-2 text-xl font-semibold text-white">Support Development</h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              If you find iFly helpful, consider supporting ongoing development. Thank you!
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 justify-items-start">
              <SocialButton
                href="https://buymeacoffee.com/joemattiello"
                label="Buy Me a Coffee"
                leftIcon={<BmcIcon className="w-5 h-5" />}
                variant="bmc"
              />
              <SocialButton
                href="https://www.patreon.com/provenance"
                label="Support on Patreon"
                leftIcon={<PatreonIcon className="w-5 h-5" />}
                variant="patreon"
              />
              <SocialButton
                href="https://account.venmo.com/u/Joe-Mattiello"
                label="Venmo: @Joe-Mattiello"
                leftIcon={<VenmoIcon className="w-5 h-5" />}
                variant="venmo"
              />
              <SocialButton
                href="mailto:mail@joemattiello.com?subject=Zelle%20Donation%20for%20iFly"
                label="Zelle: mail@joemattiello.com"
                leftIcon={<ZelleIcon className="w-5 h-5" />}
                variant="zelle"
              />
              <SocialButton
                href="https://opencollective.com/provenanceemu"
                label="Open Collective"
                leftIcon={<OpenCollectiveIcon className="w-5 h-5" />}
                variant="opencollective"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
