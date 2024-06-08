import axios, { AxiosInstance } from 'axios'

const serverHost = 'http://localhost'
const serverPort = 9999

/**
 * A lowdb-style wrapper class for GR Backend API
 * 
 * Note:
 *   I'm not sure whether 'grBackendWrapper.ts' is the best name for this file.
 *   Change it freely.
 */
export class GRBackendWrapper<T> {
    private _client: AxiosInstance
    private _key: string
    private _verbose: boolean
    private _data: T

    /**
     * Lowdb-style wrapper's constructor
     * @param key A unique key for the data (database name)
     * @param defaultData Default data if the data is not found in the backend
     */
    constructor(key: string, defaultData: T, verbose: boolean = false) {
        // _client
        this._client = axios.create({
            baseURL: `${serverHost}:${serverPort}`,
        })
        // _key
        this._key = key
        // _verbose
        this._verbose = verbose
        // _data
        this._data = defaultData
        this._load(defaultData) // async function
    }

    /**
     * Get the data from **MEMORY**
     */
    get data(): T {
        return this._data
    }

    /**
     * Set the data to **MEMORY**
     */
    set data(data: T) {
        this._data = data
    }

    /**
     * Set the data to both **MEMORY** and **BACKEND**
     */
    write(): void {
        this._save() // async function
    }

    /**
     * Read the data from the backend
     * **This function has high resource consumption**
     * @param defaultData Default data if the data is not found in the backend
     * @returns A boolean value indicating whether loading data is successful
     */
    private async _load(defaultData: T): Promise<boolean> {
        try {
            const response = await this._client.get('/get/' + this._key)
            if (this._verbose) console.log('Backend response:', response)
            this._data = response.data.value
            return true
        } catch (error: any) {
            if (error.response && error.response.status === 404) { // 404: Not found this key
                if (this._verbose) console.log('Backend response:', error.response)
                this._data = defaultData
                this._save()
                return true
            }
            console.error('Failed to get data from the backend, error info:', error)
            return false
        }
    }

    /**
     * Write the data to the backend
     * **This function has high resource consumption**
     * @returns A boolean value indicating whether saving data is successful
     */
    private async _save(): Promise<boolean> {
        const data = {
            'key': this._key,
            'value': this._data,
        }
        try {
            const response = await this._client.post('/set', data)
            if (this._verbose) console.log('Backend response:', response)
            return true
        } catch (error) {
            console.error('Failed to set data to the backend, error info:', error)
            return false
        }
    }
}