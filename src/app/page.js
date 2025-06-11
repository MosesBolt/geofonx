"use client";

export default function Page() {
  return (
    <div className="bg-black text-white min-h-screen font-sans p-8">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Geofonx</h1>
          <p className="text-xl mt-2 text-gray-400">
            Africa’s Tech Misfits, United by Chaos and Code
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            We’re not building a social network. We’re building a resistance.
          </h2>
          <p className="text-gray-300">
            Geofonx is a digital hangout for developers, science geeks, indie makers,
            and tech rebels across Africa. We solve real problems. We share weird
            builds. We don’t wait for permission.
          </p>
          <p className="text-gray-300">You bring the brains. We bring the squad.</p>
        </section>

        <section className="bg-gray-900 p-6 rounded-xl space-y-4">
          <h3 className="text-xl font-semibold">💬 What You’ll Find Inside:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>🧪 <strong>Build Logs</strong> – Show what you’re working on (even if it’s broken).</li>
            <li>🔥 <strong>Project Feedback</strong> – Get help, advice, or chaos energy from other creators.</li>
            <li>🧠 <strong>Topic Threads</strong> – Tech. AI. Science. Local hacks. All the weird stuff.</li>
            <li>🛠️ <strong>Challenges</strong> – Monthly dev prompts like “build an AI that understands your grandma.”</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-semibold">🌍 Made for Africa.</h3>
          <p className="text-gray-300">
            Not Silicon Valley. Not templates. We talk mobile money. Grid outages.
            Public transport hacks. If your problem is local, your solution is legendary.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-xl font-semibold">👀 Coming Soon:</h3>
          <ul className="list-disc list-inside text-gray-300">
            <li>🚀 The Geofonx Chatroom (Yes, it’s almost ready. Chill.)</li>
            <li>📹 YouTube features and build breakdowns</li>
            <li>🔧 Weekly community challenges</li>
          </ul>
        </section>

        <section className="text-center space-y-4">
          <p className="text-xl font-semibold">👇 Ready to Build Something Real?</p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;

              const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });

              const data = await res.json();
              alert(data.message);
            }}
            className="space-y-4"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="bg-gray-800 text-white p-2 rounded w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl"
            >
              Get Early Access
            </button>
          </form>
        </section>

        <section className="bg-gray-800 p-4 rounded-xl text-sm text-gray-400">
          <p>💬 Heard in the Lab:</p>
          <ul className="list-disc list-inside">
            <li>“This is like Discord for devs who don’t sleep.”</li>
            <li>“Someone helped me debug my Python script AND gave me a plantain recipe.”</li>
            <li>“I found my co-founder here. We’re building the future and yelling a lot.”</li>
          </ul>
        </section>

        <footer className="text-center text-gray-500 mt-10">
          <p>Follow us @geofonx. Or don’t. But you’ll miss out, and we’ll laugh behind your back.</p>
        </footer>
      </div>
    </div>
  );
}
