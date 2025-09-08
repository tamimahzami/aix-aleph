import React from "react";

export default function Landing() {
  return (
    <>
      <header className="header">
        <div className="logo">AIX <span>Aleph</span></div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Download</a>
          <a href="#">Nitro</a>
          <a href="#">Discover</a>
          <a href="#">Careers</a>
        </nav>
        <div className="auth-buttons">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </header>

      <section className="hero">
        <h1>GROUP CHAT THAT'S ALL FUN &amp; GAMES</h1>
        <p>
          AIX Aleph is great for playing games and chilling with friends, or even
          building a worldwide community. Customize your own space to talk, play,
          and hang out.
        </p>
        <div className="cta-buttons">
          <button className="cta-button cta-primary">
            <i className="fas fa-download" /> Download for Mac
          </button>
          <button className="cta-button cta-secondary">
            <i className="fas fa-globe" /> Open AIX in your browser
          </button>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="feature-content">
            <h2>MAKE YOUR GROUP CHATS MORE FUN</h2>
            <p>
              Use custom emoji, stickers, soundboard effects and more to add your
              personality to your voice, video, or text chat. Set your avatar and
              a custom status, and write your own profile to show up in chat your way.
            </p>
          </div>
          <div className="feature-image">Feature Illustration</div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <h2>STREAM LIKE YOU'RE IN THE SAME ROOM</h2>
            <p>
              High quality and low latency streaming makes it feel like you're hanging
              out on the couch with friends while playing a game, watching shows,
              looking at photos, or idk doing homework or something.
            </p>
          </div>
          <div className="feature-image">Feature Illustration</div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <h2>HOP IN WHEN YOU'RE FREE, NO NEED TO CALL</h2>
            <p>
              Easily hop in and out of voice or text chats without having to call or
              invite anyone, so your party chat lasts before, during, and after your game session.
            </p>
          </div>
          <div className="feature-image">Feature Illustration</div>
        </div>

        <div className="pill-features">
          <div className="pill"><i className="fas fa-comment" /> TALK</div>
          <div className="pill"><i className="fas fa-gamepad" /> PLAY</div>
          <div className="pill"><i className="fas fa-comments" /> CHAT</div>
          <div className="pill"><i className="fas fa-users" /> HANG OUT</div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <h2>SEE WHO'S AROUND TO CHILL</h2>
            <p>
              See who's around, playing games, or just hanging out. For supported games,
              you can see what modes or characters your friends are playing and directly join up.
            </p>
          </div>
          <div className="feature-image">Feature Illustration</div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <h2>ALWAYS HAVE SOMETHING TO DO TOGETHER</h2>
            <p>
              Watch videos, play built-in games, listen to music, or just scroll together and spam memes.
              Seamlessly text, call, video chat, and play games, all in one group chat.
            </p>
          </div>
          <div className="feature-image">Feature Illustration</div>
        </div>

        <div className="feature">
          <div className="feature-content">
            <h2>WHEREVER YOU GAME, HANG OUT HERE</h2>
            <p>
              On your PC, phone, or console, you can still hang out on AIX Aleph. Easily
              switch between devices and use tools to manage multiple group chats with friends.
            </p>
          </div>
          <div className="feature-image">Feature Illustration</div>
        </div>
      </section>

      <section className="final-cta">
        <h2>YOU CAN'T SCROLL ANYMORE.</h2>
        <p>BETTER GO CHAT.</p>
        <button className="download-btn">Download for Mac</button>
      </section>
    </>
  );
}
