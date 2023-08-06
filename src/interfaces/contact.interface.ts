export type TContact = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  nickname?: string;
  createdAt: string;
};

export type TContactRequest = Omit<TContact, "id" | "createdAt"> & {
  userId: string;
};

export type TContactForm = Omit<TContact, "id" | "createdAt">;
