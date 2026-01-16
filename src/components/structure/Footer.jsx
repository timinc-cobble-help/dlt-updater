import coinJar from "~/assets/coinJar.gif";

export default function Footer() {
  return (
    <footer>
      <div>Made with ❤️ by Tim</div>
      <div>
        <a
          href="https://ko-fi.com/programmingwithtim"
          target="_blank"
          rel="noreferrer"
          data-tooltip="Drop a coin in my coin jar ^^"
        >
          <img src={coinJar} className="logo" />
        </a>
        <span
          onClick={() => setCookieEaten(true)}
          data-tooltip="JK we don't use cookies"
        >
          🍪
        </span>
      </div>
    </footer>
  );
}
