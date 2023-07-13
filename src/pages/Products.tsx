import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks';
import { useGetProductsQuery } from '@/redux/feature/products/productsApi';
import {
  changePriceRange,
  statusToggled,
} from '@/redux/feature/products/productsSlice';
import { IProduct } from '@/types/globalTypes';

export default function Products() {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  const { toast } = useToast();
  const { priceRange, status } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const handleSlider = (value: number[]) => {
    dispatch(changePriceRange(value[0]));
  };

  const handleStatusToggled = () => {
    dispatch(statusToggled());
  };

  let productsData;
  if (status) {
    productsData = data?.data?.filter(
      (item: { status: boolean; price: number }) =>
        item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = data?.data?.filter(
      (item: { price: number }) => item.price < priceRange
    );
  } else {
    productsData = data?.data;
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Switch id="in-stock" onClick={handleStatusToggled} />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[200000]}
              max={200000}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0 To {priceRange}</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
