const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;
const { BrowserRouter } = ReactRouterDOM;
import familylist from './familylist'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function App() {
  return (
    <>
      <FamilyTree />
    </>
  );
}

class FamilyTree extends React.Component {
  cont = React.createRef();

  componentDidMount() {
    if (!this.cont.current) return;
    const store = f3.createStore({
      data: data(),
      node_separation: 250,
      level_separation: 150
    })
    const svg = f3.createSvg(document.querySelector("#FamilyChart"))
    const Card = f3.elements.Card({
      store,
      svg,
      card_dim: {w:220,h:70,text_x:75,text_y:15,img_w:60,img_h:60,img_x:5,img_y:5},
      card_display: [i=>`${i.data["first name"]||""} ${i.data["last name"]||""}`,i=>`${i.data.birthday||""}`],
      mini_tree: true,
      link_break: false
    })
    store.setOnUpdate(props => f3.view(store.getTree(), svg, Card, props || {}))
    store.updateTree({initial: true})
    
    function data() {
      return familylist
    }

  }

  render() {
    return <div className="f3" id="FamilyChart" ref={this.cont}></div>;
  }
}

root.render(
  <>
    <App />
  </>
);
