export type ButtonProps = {
  text: string;
  variant: "btn-normal" | "btn-outline" | "btn-calculator";
  action?: (e?: React.FormEvent) => void;
};

export type TProducts = {
  categories: string;
  weight: number;
  title: string;
  calories: number;
  groupBloodNotAllowed: [boolean];
};

export type TUsers = {
  name: string;
  email: string;
  password: string;
};

export type TEntries = {
  date: Date;
  productName: string;
  grams: number;
  kcal: number;
  owner: string;
};

export type TModalProps = {
  recomandedCalories?: number;
  bannedProductsList?: string[] | void;
  userId?: string | "";
  text?: string;
  calories?: number;
  onClose?: () => void;
  onOK?: () => void;
  children?: React.ReactNode;
};

export type RootState = {
  products: {
    products: TProducts[];
    bannedProducts: TProducts[];
    isLoading: boolean;
    error: string;
  };
  user: {
    isLoggedIn: boolean;
    name: string;
    _id: string;
  };
  entries: {
    entryList: [];
  };
};

export type TSessionData = {
  userId?: string;
  userEmail?: string;
  userName?: string;
  isLoggedIn: boolean;
  bannedFoods?: string[] | void;
  entryList?: [];
  consumedCals?: number;
  recomandedCals?: number;
  session: string;
};

export type Entry = {
  _id: string;
  productName: string;
  grams(grams: any): number;
  kcal(kcal: any): number;
  entryList: {
    id: string;
    _id: string;
    productName: string;
    grams: string;
    kals: string;
  }[];
};

export type EntryProps = {
  entryList: Entry[];
  setEntryList: React.Dispatch<React.SetStateAction<Entry[]>>;
};

export type ConsumedProductProps = {
  id: string;
  productName: string;
  grams: number;
  cals: number;
  setEntryList: (entries: object[]) => void;
  kcal?: number;
};

export type PageProps = {
  name: string;
};
