export interface WishlistProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category: {
    name: string;
  };
  brand: {
    name: string;
  };
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: WishlistProduct[];
}
