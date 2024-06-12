import { getFiltros } from 'src/utils/Util';
import { ref, Ref } from 'vue'

interface Pagination {
    page: number;
    total: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Filters {
    // Define your filters here
}

interface Order {
    field: string;
    order: string;
}

interface Repository {
    (params: Filters ): Promise<any>;
}

interface Options {
    incluir?: string[];
    order?: Order[];
}

export default function useDataFetching(
    repository: Repository, 
    options : Options = {}
) {
    const items = ref<any>(null)
    const initialPagination: Pagination = {
        page: 1,
        total: 0,
        last_page: 0,
        next_page_url: null,
        prev_page_url: null
    }
    const pagination= ref<Pagination>(initialPagination)
    const loading = ref(false)

    const fetchData = async (filters: Filters = {}) => {
        const { incluir, order } = options
        try {
            loading.value = true

            const response = await repository({
                ...getFiltros(filters),
                page: pagination.value.page,
                ...(incluir && incluir.length > 0 ? { incluir} : {}),
                order: order || [] // Provide a default value for the 'order' parameter
            })
            if('data' in response){
                const { data, current_page, total, last_page, next_page_url, prev_page_url } = response 
                items.value = data
                pagination.value = { ...pagination.value, page: current_page, total, last_page, next_page_url, prev_page_url }
            }
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }


    return { items, pagination, loading, fetchData }
}