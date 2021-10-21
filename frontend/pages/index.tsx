import clsx from 'clsx';
import Head from 'next/head';
import { ComponentPropsWithoutRef } from 'react';
import { HiThumbUp, HiThumbDown, HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi';
import { useQuery } from 'react-query';

import Pipe from '@/components/Pipe';
import api from '@/modules/api';
import { Dish } from '@/types/data';

function pluralize(count: number, singular: string, plural: string) {
  return Math.abs(count) === 1 ? singular : plural;
}

function Button(props: ComponentPropsWithoutRef<'button'>) {
  return <button {...props} className={clsx(props.className, 'hover:text-blue-dark')} />;
}

function Product({ className, dish }: { className?: string; dish: Dish }) {
  return (
    <div className={clsx(className, 'border rounded p-4 flex justify-between items-start')}>
      <div>
        <strong>{dish.name}</strong>
        {dish.ingredients.length > 0 ? (
          <p className="text-blue-dark">
            {dish.ingredients.map((ingredient) => ingredient.name).join(', ')}
          </p>
        ) : (
          <p className="text-sea-grey">no ingredients</p>
        )}
      </div>
      <Pipe />
      <div className="text-right flex-shrink-0">
        <strong className="text-xl">{dish.price.toFixed(2)} €</strong>
        <br />
        <div>
          {dish.likes} {pluralize(dish.likes, 'like', 'likes')}
          <Pipe />
          <Button type="button">
            <HiThumbUp className="inline-block w-4 h-4" /> Like
          </Button>
          <Pipe />
          <Button type="button">
            <HiThumbDown className="inline-block w-4 h-4" /> Dislike
          </Button>
        </div>
      </div>
    </div>
  );
}

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
