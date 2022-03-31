window.addEventListener('load', () =>{

    if(!localStorage.getItem('data')){
        localStorage.setItem('data',JSON.stringify([]))

    }else{
        const data = JSON.parse(localStorage.getItem('data'))

        const dataWithId = data.map((item,index) =>{
            return {...item,id:index}
        })
        localStorage.setItem('data', JSON.stringify([...dataWithId]))

        const base = JSON.parse(localStorage.getItem('data'))

        cardTemplate(base)
    }

})

$title = document.querySelector('.title')
$url = document.querySelector('.url')
$btn = document.querySelector('.btn')
$out = document.querySelector('.output')

function cardTemplate(base){
    const template = base.map(({title,url,id})=>{
        return `
            <div class = 'col-12 col-sm-6 col-xl-4'>
                <div class = 'card'>
                    <div class = 'card-header text-center'>${title}</div>
                    <div class = 'card-img'>
                        <img src=${url} alt class='w-100'/>
                    </div>
                    <div class = 'card-footer'>
                        <button class='btn btn-danger'onclick='delet(${id})'>Delete</button>
                        <button class='btn btn-info' onclick="Edit(${id})">Edit</button>                  
                    </div>
                </div>
            </div>
        `
    }).join('')

    $out.innerHTML = template
}
function delet(idBase){
    const base = JSON.parse(localStorage.getItem('data'))

    const filtred = base.filter(item => item.id !== idBase)

    localStorage.setItem('data',JSON.stringify(filtred))

    window.location.reload()
}
function Edit(idBase){
    const base = JSON.parse(localStorage.getItem('data'))
    const filtred = base.map(item => {
        if(item.id === idBase){
            item.title = prompt('New title')
            return item
        }else{
            return
        }
    })
    localStorage.setItem('data',JSON.stringify(filtred))
    window.location.reload()

}
$btn.addEventListener('click',e => {

    e.preventDefault()

    if($title.value.length === 0 || $url.value.length === 0){
        if($title.value.length === 0){
            $title.style.borderColor = 'red'

        }
        if($url.value.length === 0){
            $url.style.borderColor = 'red'

        }
    
    }else{
        const base = JSON.parse(localStorage.getItem('data'))
        localStorage.setItem('data' , JSON.stringify(
            [...base , {id:1,title:$title.value, url:$url.value}]
        ))
        window.location.reload()
    }

})