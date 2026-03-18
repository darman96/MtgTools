import "@/theme/font-imports";
import { render } from "preact";
import { Route, Router } from "preact-iso";
import ProviderStack from "@components/ProviderStack";
import { Home } from "@app/Home";
import { Vault } from "@app/Vault";
import { DeckBuilder } from "@app/DeckBuilder";
import { NotFound } from "@app/_404";
import Layout from "@app/_layout";

export function App() {
  return (
    <ProviderStack>
      <Layout>
        <Router>
          <Route component={Home} path="/" />
          <Route component={Vault} path="/vault" />
          <Route component={DeckBuilder} path="/deck-builder" />
          <Route default component={NotFound} />
        </Router>
      </Layout>
    </ProviderStack>
  );
}

render(<App />, document.getElementById("app"));
