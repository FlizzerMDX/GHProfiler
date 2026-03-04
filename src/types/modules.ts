export interface Module{
    key: string,
    name: string,
    description: string,
    repo: string,
    link: string,
    tags: string[],
    params: Param[],
}

export interface Option{
    key: string,
    name: string
}

export interface Param{
    key: string,
    name: string,
    description: string,
    type: string,
    options?: Option[]
    required: boolean,
}

export interface Modules{
    modules: Module[],
}