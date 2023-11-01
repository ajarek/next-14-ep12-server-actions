import { revalidatePath } from 'next/cache'


let productsStore=[
  {id:'1',
  title:"czajnik"
},
  {id:'2',
  title:"garnek"
}
  
]

export default function Home() {
  
    async function myAction(formData) {
      
      'use server'
      productsStore=[{
        id:Math.floor(Math.random()*1000),
        title:formData.get('title')
      },
      ...productsStore
    ]

    revalidatePath('/')
    
    }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={myAction}>
      <input type="text" name="title" />
      <button type="submit">Add Product</button>
    </form>
    <div>
      {productsStore.map(el=>{
        return(
          <div key={el.id}>
            <p>{el.title}</p>
          </div>
        )
      })}
    </div>
    </main>
  )
}
