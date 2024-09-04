import { getFiltros } from 'src/utils/Util';
import { ref } from 'vue'

interface Pagination {
    page: number;
    total_results: number;
    total_pages: number;
    last_page: number;
    has_more: boolean;
}

interface Filters {
    // Define your filters here
}

interface Order {
    field: string;
    order: string;
}

interface Repository<T> {
    (params: Filters ): Promise<T>;
}

export interface Options {
    incluir?: string[];
    order?: Order[];
}

export default function useDataFetching<T>(
    repository: Repository<T>, 
    options : Options = {}
) {
    const initialPagination: Pagination = {
        page: 1,
        total_results: 0,
        total_pages: 0,
        last_page: 0,
        has_more: false,
        
    }
    const pagination= ref<Pagination>(initialPagination)
    const loading = ref(false)

    const fetchData = async (filters: Filters = {}) : Promise<T> => {
        const { incluir, order } = options
        try {
            loading.value = true
            const response = await repository({
                ...getFiltros(filters),
                page: pagination.value.page,
                ...(incluir && incluir.length > 0 ? { incluir} : {}),
                order: order || [] // Provide a default value for the 'order' parameter
            })
            return response
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }


    return { pagination, loading, fetchData }
}