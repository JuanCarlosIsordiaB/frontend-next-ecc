import React from 'react'

type Params = Promise<{categoryId: string}>

export default async function StorePage({params}:{params: Params}) {
    const {categoryId} = await params;
    console.log(categoryId);
  return (
    <div>page</div>
  )
}

 