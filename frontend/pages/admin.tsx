import Product from '@/components/Product';
import api from '@/modules/api';
import { Dish } from '@/types/data';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

interface Props {
  dishes: Dish[]
}

interface DeleteProductProps {
  id: string
}


function Admin(props: Props) {
  const { dishes } = props 
  const [ initialDishes, setDishes ] = useState<Dish[]>([])
  useEffect(() => {
    if (dishes) {
      setDishes(dishes)
    }
  }, [dishes])

  const deleteMutation = useMutation( async (data:DeleteProductProps) => {
    
    await api.delete(`/dishes/${data.id}`)

  }, {
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (_data, vars) => {
    const dishesCopy = [...initialDishes]
    setDishes(dishesCopy.filter(item => item.id !== vars.id))

  }
  } )
  return (
    <>
    <Head >

      </Head>
      <title>Restaurant App - Admin</title>
      <ul className="p-4 mx-auto max-w-5xl">
        {initialDishes.map(item => (
          <Product hideLikes={true} dish={item} key={item.id} onDelete={() => deleteMutation.mutateAsync({id: item.id})} />
        ))}
      </ul>
    </>
  );
}

export const getServerSideProps = async () => {
  const dishes = await api.get<Dish[]>('/dishes')
  return {
    props: {
      dishes: dishes.data
    }
  }
}

export default Admin;
