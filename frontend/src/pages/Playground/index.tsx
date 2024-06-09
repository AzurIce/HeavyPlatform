import { Button } from "@suid/material";
import { Add, Remove } from "@suid/icons-material";
import { Accessor, Component, Signal, createEffect, createSignal } from "solid-js";

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

const MyButtonBad: Component<{ disabled: boolean }> = (props) => {
  const { disabled } = props;

  createEffect(() => {
    console.log(`[MyButtonBad]:`, props);
  })
  return <>
    {disabled ? "true" : "false"}
  </>
}

const MyButtonGood: Component<{ disabled: boolean }> = (props) => {
  createEffect(() => {
    console.log(`[MyButtonGood]:`, props.disabled)
  })
  return <>
    {props.disabled ? "true" : "false"}
  </>
}

const MyButtonAlsoGood: Component<{ disabled: boolean }> = (props) => {
  let [disabled, setDisabled] = createSignal(false);

  createEffect(() => {
    setDisabled(props.disabled)
  })

  return <>
    {disabled() ? "true" : "false"}
  </>
}

const MyButtonStillGood: Component<{ disabled: boolean }> = (props) => {
  const disabled = () => props.disabled;

  return <>
    {disabled() ? "true" : "false"}
  </>
}

const Playground: Component = () => {
  const cntSignal = createSignal(0);
  const [cnt, setCnt] = cntSignal;

  const derivedCnt = () => {
    console.log("derivedCnt")
    return -cnt()
  }

  const [disabled, setDisabled] = createSignal(false);

  return <>
    <div class="flex flex-col">
      {cnt()}
      {derivedCnt()}
    </div>

    <MyComponent acc={derivedCnt} />
    <MyComponent2 sig={cntSignal} />
    <MyComponent3 num={cnt()} />

    <Button disabled={disabled()}>asd</Button>
    <MyButtonBad disabled={disabled()}/>
    <MyButtonGood disabled={disabled()}/>
    <MyButtonAlsoGood disabled={disabled()}/>
    <MyButtonStillGood disabled={disabled()}/>
    <Button onClick={() => setDisabled((prev) => !prev)}>toggle</Button>

    <Button onClick={() => setCnt((cnt) => cnt + 1)}><Add /></Button>
    <Button onClick={() => setCnt((cnt) => cnt - 1)}><Remove /></Button>
  </>
}

export default Playground;