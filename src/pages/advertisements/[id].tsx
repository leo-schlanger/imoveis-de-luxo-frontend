import { Button } from '@material-ui/core'
import {useRouter} from 'next/router';
import Head from 'next/head'

export default function Home() {
  const {query} = useRouter();
  return (
    <>
    <Head>
      <title>{query.id}</title>
    </Head>
    <div>
      <Button variant="contained" color="primary">Detalhes do pedido {query.id}!!</Button>
    </div>
    </>
  )
}
