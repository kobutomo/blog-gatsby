---
title: 初カキコ…ども
date: "2019-12-05"
---

例えば、bodyのフォントサイズが1emに**セットされているものとする**と、ブラウザ標準の1em = 16pxです。使いたいフォントサイズが12pxなら、0.75emを指定します（12/16 = 0.75だからです）。同様に、使いたいフォントサイズが10pxなら、0.625emを指定します（10/16 = 0.625）。22pxなら1.375emです（22/16）。  
改行

文書内どこでも使えるよく知られたテクニックとして、**bodyのフォントサイズを62.5%にする**ことで（これはデフォルト16pxの62.5%です）、これは10px、すなわち0.625emになります。これで「px値を10で割る」という覚えやすい変換式を使って、どの要素にもem単位でフォントサイズをセットできます。この方法では6px = 0.6em、8px = 0.8em、12px = 1.2em、14px = 1.4em、16px = 1.6emになります。例を挙げます:

```javascript:title=/components/index.tsx
a
console.log(this.state.whatTheFuck)
const Component:React.FC = ({children}) => {
  return <p>{children}</p>
}
const Component:React.FC = ({children}) => {
  return <p>{children}</p>
}
const Component:React.FC = ({children}) => {
  return <p>{children}</p>
}
```
