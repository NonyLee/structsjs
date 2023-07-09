import { createSignal,  onMount } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import { Application, Sprite, Assets } from 'pixijs';
import './App.css'
import { BinaryTreeBuilder } from './generator';

function App() {
  // const [count, setCount] = createSignal(0)
  let $container: HTMLDivElement

  onMount(() => {
    const app = new Application({resolution: window.devicePixelRatio, autoDensity: true});
    $container.appendChild(app.view);
    new BinaryTreeBuilder(5).generate().getTreeDrawer(app)?.draw();
  })

  return (
    <>
      <div ref={$container}>
        
      </div>
    </>
  )
}

export default App
