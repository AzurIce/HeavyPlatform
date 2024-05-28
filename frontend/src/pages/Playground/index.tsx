import { Button } from "@suid/material";
import { Add, Remove } from "@suid/icons-material";
import { Accessor, Component, Signal, createSignal } from "solid-js";

const MyComponent: Component<{ acc: Accessor<number> }> = (props) => {
  const { acc } = props;

  const derivedAcc = () => {
    console.log("derivedAcc")
    return `derivedAcc: ${acc()}`
  }

  return <>
    <div class="bg-blue">{acc()}</div>
    <div class="bg-blue">{derivedAcc()}</div>
  </>
}

const MyComponent2: Component<{ sig: Signal<number> }> = (props) => {
  const [sig, setSig] = props.sig;

  const derivedSig = () => {
    console.log("derivedSig")
    return `derivedSig: ${sig()}`
  }

  return <>
    <div class="bg-green">{sig()}</div>
    <div class="bg-green">{derivedSig()}</div>
  </>
}

const MyComponent3: Component<{ num: number }> = (props) => {
  const { num } = props;
  return <>
    {num}
  </>
}

const Playground: Component = () => {
  const cntSignal = createSignal(0);
  const [cnt, setCnt] = cntSignal;

  const derivedCnt = () => {
    console.log("derivedCnt")
    return -cnt()
  }

  return <>
    <div class="flex flex-col">
      {cnt()}
      {derivedCnt()}
    </div>

    <MyComponent acc={derivedCnt} />
    <MyComponent2 sig={cntSignal} />
    <MyComponent3 num={cnt()} />

    <Button onClick={() => setCnt((cnt) => cnt + 1)}><Add /></Button>
    <Button onClick={() => setCnt((cnt) => cnt - 1)}><Remove /></Button>
  </>
}

export default Playground;