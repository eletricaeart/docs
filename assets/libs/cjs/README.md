
# 🧩 DOM.js — Mini biblioteca DOM moderna

Uma biblioteca minimalista inspirada no jQuery, escrita em JavaScript moderno (ES Modules), com suporte total a **Shadow DOM**, **transições CSS** e **encadeamento fluido**. Ideal para projetos modernos que desejam manipular o DOM de forma elegante sem depender de grandes frameworks.

---

## 🚀 Instalação

```bash
# Copie o arquivo para o seu projeto
src/lib/dom.js
```

Ou importe diretamente via módulo:

```js
import { $, $$ } from './lib/dom.js';
```

---

## ⚡ Uso básico

```js
const box = $('#box');
const buttons = $$('.btn');

box.html('<h2>Olá!</h2>').css({ color: 'white', background: '#333' });
buttons.on('click', e => $(e.target).fadeToggle());
```

---

## 💎 O que você ganha

### 🔹 Funções Globais

#### **$ (selector, all = false, root = document)**
Simula `document.querySelector` e `querySelectorAll`.
- `selector`: seletor CSS.
- `all`: se `true`, retorna `NodeList`.
- `root`: define o escopo (padrão: `document`).

✅ **Ganho:** Uma função única que faz o papel de `$` e `$$`, com suporte a Shadow DOM.

#### **$$ (selector, root = document)**
Atalho para `$(selector, true, root)`.

✅ **Ganho:** Sintaxe enxuta para seleção múltipla de elementos.

---

### 🔹 Métodos em `Element.prototype`

#### **el.$(selector, all = false)**
Executa seletores a partir de um elemento (como `element.querySelector`).

✅ **Ganho:** Permite selecionar dentro de um elemento específico.

#### **el.$$(selector)**
Atalho para `el.$(selector, true)`.

✅ **Ganho:** Seleciona múltiplos elementos dentro de um container.

#### **el.on(event, handler, options)**
Adiciona um event listener ao elemento.

✅ **Ganho:** Encadeável e mais elegante que `addEventListener`.

#### **el.css(property, value)**
Define ou obtém estilos CSS.
- Se `property` for um objeto, aplica múltiplos estilos.

✅ **Ganho:** Define vários estilos em uma linha, como no jQuery.

#### **el.attr(name, value)**
Define ou obtém atributos do elemento.

✅ **Ganho:** Manipulação simples e fluida de atributos.

#### **el.html(content)**
Define ou obtém `innerHTML`.

✅ **Ganho:** Simplifica inserções e manipulação de HTML.

#### **el.text(content)**
Define ou obtém `textContent`.

✅ **Ganho:** Manipulação direta de texto sem HTML.

#### **el.append(content)**
Adiciona conteúdo ao final do elemento.
Aceita elementos, strings ou listas.

✅ **Ganho:** Flexível e intuitivo para adicionar múltiplos elementos.

#### **el.prepend(content)**
Adiciona conteúdo no início do elemento.

✅ **Ganho:** Controle total sobre inserções no DOM.

#### **el.remove()**
Remove o elemento do DOM.

✅ **Ganho:** Substitui `parentNode.removeChild(el)` com estilo.

#### **el.empty()**
Remove todo o conteúdo interno do elemento.

✅ **Ganho:** Limpeza rápida de containers.

---

### 🔹 Métodos de Animação

#### **el.fadeIn(duration = 300, display = 'block')**
Mostra o elemento com transição de opacidade.

✅ **Ganho:** Transição suave e reutilizável.

#### **el.fadeOut(duration = 300)**
Oculta o elemento com fade-out.

✅ **Ganho:** Remoção visual elegante.

#### **el.fadeToggle(duration = 300, display = 'block')**
Alterna entre fadeIn e fadeOut.

✅ **Ganho:** Um comando único para visibilidade animada.

#### **el.slideUp(duration = 300)**
Recolhe o elemento verticalmente.

✅ **Ganho:** Efeito de recolhimento fluido tipo jQuery.

#### **el.slideDown(duration = 300, display = 'block')**
Expande o elemento verticalmente.

✅ **Ganho:** Animações suaves sem precisar de bibliotecas externas.

#### **el.slideToggle(duration = 300, display = 'block')**
Alterna entre slideUp e slideDown.

✅ **Ganho:** Alternância visual com um só comando.

---

### 🔹 Métodos em `NodeList.prototype`

Todos os métodos de `Element` também estão disponíveis para `NodeList`.
Eles são aplicados a **cada elemento da lista**.

✅ **Ganho:** Manipulação em grupo sem loops manuais.

Exemplo:
```js
$$('.card').css({ opacity: 0.8 }).on('click', e => $(e.target).fadeOut());
```

---

## 🧠 Recursos avançados

- Suporte nativo a **Shadow DOM**
- Animações baseadas em **CSS transitions**
- Totalmente **encadeável**
- Zero dependências

---

## 🧩 Licença

MIT © 2025 — Desenvolvido com 💡 e ☕

