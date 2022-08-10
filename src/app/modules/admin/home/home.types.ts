export interface HomeProduct
{
    idTramite: number;
    category?: string;
    name: string;
    description?: string;
    tags?: string[];
    sku?: string | null;
    barcode?: string | null;
    brand?: string | null;
    vendor: string | null;
    stock: number;
    reserved: number;
    cost: number;
    basePrice: number;
    taxPercent: number;
    price: number;
    weight: number;
    thumbnail: string;
    images: string[];
    active: boolean;
}

export interface HomePagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface HomeCategory
{
    id: string;
    parentId: string;
    name: string;
    slug: string;
}

export interface HomeBrand
{
    id: string;
    name: string;
    slug: string;
}

export interface HomeTag
{
    id?: string;
    title?: string;
}

export interface HomeVendor
{
    id: string;
    name: string;
    slug: string;
}
