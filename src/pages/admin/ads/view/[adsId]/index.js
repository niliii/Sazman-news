import Container from "react-bootstrap/Container";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";

export default function SliderId({data}) {
    const router = useRouter()
    const returnLastPage = () => {
        router.push("/admin/ads/1")
    }
    return (
        <Container className={"rounded-4"}>
            <Button onClick={returnLastPage}>
                بازگشت به صفحه قبل
            </Button>
            <div className={"d-flex flex-row justify-content-center mt-4"}>
                <Col xs={12} sm={11} md={8} lg={5} xl={5} className={"shadow-sm bg-white rounded-4"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5 px-sm-3"}>
                            <TextField
                                className={"col-md-9 col-11"}
                                label="عنوان"
                                variant="outlined"
                                disabled={true}
                                value={data.data.title}
                            >
                            </TextField>
                            <img alt={""} className={"w-100 rounded mt-3"}
                                 src={`${process.env.SERVER_URL}/${data.data.data}`}/>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}

export async function getServerSideProps(context) {
    try {
        const {params, req} = context
        const authToken = req.cookies.authToken
        const response = await fetch(`https://newsapi.deltagroup.ir/panel/ads/${params.adsId}`, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        })
        const data = await response.json()
        return {
            props: {data}
        }
    } catch {
        const data = {status: false, data: {data: {}}}
        return {
            props: {data}
        }
    }

}