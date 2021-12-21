import { Dish } from "@/types/data";
import { pluralize } from "@/utils";
import clsx from "clsx";
import Pipe from '@/components/Pipe';
import { ComponentPropsWithoutRef, useState } from "react";
import { HiThumbUp, HiThumbDown } from 'react-icons/hi';
import SimpleModal from "./modal/simpleModal";


export function Button(props: ComponentPropsWithoutRef<'button'>) {
    return <button {...props} className={clsx(props.className, 'hover:text-blue-dark')} />;
}


interface Props {
    className?: string
    dish: Dish
    hideLikes?: boolean
    onDelete?(): void
}

export default function Product(props: Props) {
    const { className, dish, hideLikes, onDelete } = props
    const [ openModal, setOpenModal ] = useState(false)
    return (
        <>
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
                {!hideLikes ?
                    <>
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
                    </> :
                    <div style={{
                        width: '100px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }} >
                        <Button type="button" onClick={() => setOpenModal(true) } >
                            Add
                        </Button>
                        <Button type="button" onClick={onDelete} >
                            Remove
                        </Button>
                    </div>

                }
            </div>
        </div>
        <SimpleModal open={openModal} onClose={() => setOpenModal(false)} />
        </>
    );
}
