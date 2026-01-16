import Footer from "~/components/structure/Footer";
import Header from "~/components/structure/Header";
import Main from "~/components/structure/Main";

export default function Page({ name, children }) {
  return (
    <div id="pico-root">
      <Header name={name} />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
