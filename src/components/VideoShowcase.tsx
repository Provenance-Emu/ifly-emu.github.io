import media from '@/data/media.json';

function Player({clip,label}:{clip:typeof media.main;label:string}) {
  return <video controls muted playsInline preload="none" poster={clip.poster} width={clip.width} height={clip.height} aria-label={label} className="h-auto w-full rounded-2xl bg-black" style={{aspectRatio:`${clip.width} / ${clip.height}`}}>
    <source src={clip.src} type="video/mp4" />
    <a href={clip.src}>Download the gameplay video</a>
  </video>;
}

export default function VideoShowcase() {
  return <section id="gameplay" className="container mx-auto px-4 py-16">
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-4 text-center text-3xl font-bold text-white">Dreamcast homebrew in motion</h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-gray-400">Gravity Wave and Ridgeline, with Trinitron rendering and a live VMU.</p>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"><Player clip={media.main} label="iFly homebrew gameplay with recorded game audio" /></div>
      <p className="mt-4 text-center text-sm text-gray-400">Original game audio. Unmute the player to listen. Watch VMU is a Plus feature in the App Store edition. Sideloaded builds include Plus features.</p>
      <p className="mt-2 text-center text-xs text-gray-400"><a href="https://github.com/richstokes/dreamcast-homebrew" className="underline">Gravity Wave and Ridgeline by Rich Stokes (MIT)</a></p>
      <details className="mt-8 rounded-2xl border border-gray-500/30 p-5">
        <summary className="cursor-pointer font-semibold text-white">Watch the iPhone and iPad previews</summary>
        <div className="mt-6 flex flex-wrap items-start justify-center gap-8">
          {media.previews.map(clip=><figure key={clip.src} className={clip.title==='iPhone'?'w-full max-w-xs':'w-full max-w-sm'}>
            <Player clip={clip} label={`iFly ${clip.title} app preview`} />
            <figcaption className="mt-3 text-center text-sm text-gray-400">{clip.title} · actual app controls and recorded game sound</figcaption>
          </figure>)}
        </div>
      </details>
    </div>
  </section>;
}
