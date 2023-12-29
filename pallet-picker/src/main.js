import '../src/style/style.css'
import '../src/style/form.css'
import {v4 as uuid} from "uuid"
// import defaultPallet from "./default-pallet.json"
import {setPallets, getPallets, removePallet, addPallets, initializePallets} from "./function_components/local_storage"
// setPallets(defaultPallet)
const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    console.log(formData)
    const formObj = {
        colors: formData.getAll("colors"),
        title: formData.get('title'),
        temperature: formData.get('temperature'),
        uuid: uuid(),
    }

    
    if (!(formObj.temperature) || !(formObj.title)) {
        console.log(formObj)
        return 
    }

    console.log(formObj.temperature)

    const ul = document.querySelector('ul')

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }

    addPallets(formObj)
    renderPallets()

    form.reset()
}

const renderPallets = () => {
    const ul = document.querySelector('ul')
    const data = getPallets()
    console.log(data)
    data.forEach((input) => {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const span1 = document.createElement('span')
        const span2 = document.createElement('span')
        const span3 = document.createElement('span')
        const button = document.createElement('button')
        const p = document.createElement('p')

        h3.innerText = input.title
        span1.innerText = input.colors[0]
        span1.setAttribute("class", "paint")
        span1.setAttribute("style", `background-color: ${input.colors[0]}`)
        span2.setAttribute("class", "paint")
        span2.setAttribute("style", `background-color: ${input.colors[1]}`)
        span3.setAttribute("class", "paint")
        span3.setAttribute("style", `background-color: ${input.colors[2]}`)
        button.innerText = "Delete pallet"
        button.addEventListener("click", () => {
            ul.removeChild(li)
            removePallet(input)
        })
        span2.innerText = input.colors[1]
        span3.innerText = input.colors[2]
        p.innerText = input.temperature
        li.appendChild(h3)
        li.appendChild(span1)
        li.appendChild(span2)
        li.appendChild(span3)
        li.appendChild(button) 
        li.appendChild(p)
        ul.append(li)
    })


}

const main = () => {
    const form = document.querySelector('#palletForm')
    form.addEventListener('submit', handleSubmit)
    if (!getPallets()) initializePallets();
    renderPallets()
}

main()