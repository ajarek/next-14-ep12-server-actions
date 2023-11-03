import { revalidatePath } from 'next/cache'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProfileForm } from '@/components/ui/ProfileForm'

let productsStore = [
  { id: '1', title: 'czajnik', price: '58.00' },
  { id: '2', title: 'garnek', price: '158.00' },
]

export default function Home() {
  async function myAction(formData) {
    'use server'
    console.log(formData)
    productsStore = [
      {
        id: Math.floor(Math.random() * 1000),
        title: formData.get('title'),
        price: formData.get('price'),
      },
      ...productsStore,
    ]

    revalidatePath('/')
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-start px-24 max-sm:px-2 '>
      <ProfileForm action={myAction} />
      <Table className='border-2 border-slate-600 mt-4'>
        <TableCaption>Lista dodanych towarów </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px] font-bold'>Nr</TableHead>
            <TableHead className='font-bold'>Status Towaru</TableHead>
            <TableHead className='font-bold'>Nazwa Towaru</TableHead>
            <TableHead className='text-right font-bold'>Cena w PLN</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsStore &&
            productsStore.map((el) => (
              <TableRow
                key={el.id}
                className='border-2 border-slate-600'
              >
                <TableCell className='font-medium'>{el.id}</TableCell>
                <TableCell>Dostępny</TableCell>
                <TableCell>{el.title}</TableCell>
                <TableCell className='text-right'>{el.price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  )
}
