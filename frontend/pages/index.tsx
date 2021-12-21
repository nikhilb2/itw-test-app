import clsx from 'clsx';
import Head from 'next/head';
import { HiThumbUp, HiThumbDown, HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import { useQuery } from 'react-query';

import Pipe from '@/components/Pipe';
import api from '@/modules/api';
import { Dish } from '@/types/data';
import { pluralize } from '@/utils';
import Product, { Button } from '@/components/Product';



export default function Home() {
  const dishesQuery = useQuery('GetDishes', () => api.get<Dish[]>('/dishes'), {
    select: ({ data }) => data,
  });

  return (
    <>
      <Head>
        <title>Restaurant App - Home</title>
      </Head>
      <ul className="p-4 mx-auto max-w-5xl">
        {(dishesQuery.data ?? []).map((dish, index) => (
          <li className={clsx('flex', index !== 0 && 'mt-4')} key={dish.id}>
            <Product className="flex-grow" dish={dish} />
            <Pipe />
            <div className="border flex items-center rounded p-4">
              <Button className="inline-flex items-center justify-center h-8 w-8">
                <HiOutlinePlus className="h-5 w-5" />
              </Button>
              <span className="mx-2 text-xl">0</span>
              <Button className="inline-flex items-center justify-center h-8 w-8">
                <HiOutlineMinus className="h-5 w-5" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}