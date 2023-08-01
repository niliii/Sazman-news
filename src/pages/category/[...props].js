import {Col} from "react-bootstrap";
import HotNewsItem from "@/Components/Public/HotNewsItem";
import {Pagination, Tab, Tabs} from "@mui/material";
import {useContext, useState} from "react";
import MenuContext from "@/Contexts/MenuContext";
import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default function SearchPage({slicedData, pageNumber, pageCount}) {
    const router = useRouter()
    const routerName = router.query.props[0]
    const menuContext = useContext(MenuContext)
    const routeCategory = menuContext.categories.find(item => item.title === routerName)
    let subCategoryItems = !routeCategory.parentID ? menuContext.categories.filter(item => item.parentID === routeCategory.ID) : menuContext.categories.filter(item => item.parentID === routeCategory.parentID)
    const handlePage = (event) => {
        router.replace(`${routerName}/${event.target.innerText}`)
    }

    const [value, setValue] = useState(!routeCategory.parentID ? 0 : routeCategory.ID);
    const handleChange = (event, newValue) => {
        if (newValue != 0) {
            const h = menuContext.categories.find(item => item.ID === newValue)
            router.replace(h.title)
        } else {
            const h = menuContext.categories.find(item => item.ID === routeCategory.parentID)
            router.replace(h.title)
        }
        setValue(newValue);
    };


    return (
        <div className={"container mt-3"}>
            <div className={"parent mx-lg-3 content rounded-3 mt-0 d-flex flex-column py-4 px-md-3 px-1"}>
                <div className={"d-flex flex-row flex-wrap gap-3"}>
                    <div className="d-flex flex-column col-xl col-12  py-3 gap-2 px-sm-4 px-2">
                        <div className="d-flex flex-row">
                            <div className="title-parent w-100">
                                <h5 className="main-title- text-capitalize header-title">
                                    جدید ترین اخبار حوزه
                                </h5>
                            </div>
                        </div>
                        <div className="col-12 d-flex flex-row justify-content-center justify-content-xl-start">
                            <div className="col-12 col-lg-10 d-flex flex-column justify-content-center ps-5 mt-4">
                                <h1>
                                    {routerName}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column col-xl col-12 py-3 gap-2 px-sm-4 px-2">
                        <div className="d-flex flex-row">
                            <div className="title-parent w-100">
                                <h5 className="main-title- text-capitalize header-title">
                                    شرکت های فعال در حوزه {routerName}
                                </h5>
                            </div>
                        </div>
                        <div className="d-flex flex-row flex-wrap gap-lg-4 gap-3 px-3">
                        </div>
                    </div>
                </div>
                <Box sx={{minWidth: '100%'}} className={"mt-4"}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider', overflowX: "scroll"}}>
                        <Tabs className={"no-scroll-bar"} sx={{width: "fit-content"}} value={value}
                              onChange={handleChange} aria-label="basic tabs example">
                            <Tab label={"همه"}></Tab>
                            {subCategoryItems.map(item =>
                                <Tab key={item.ID} label={item.title} value={item.ID}></Tab>
                            )}
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Col xs={12} sm>
                            <div className={"d-flex flex-row flex-wrap mt-4 shadow-sm"}>
                                {slicedData.map((item) =>
                                    <Col key={item.id} xs={"6"} md={"6"} lg={"4"} xl={"3"}>
                                        <HotNewsItem {...item}></HotNewsItem>
                                    </Col>)}
                            </div>
                        </Col>
                    </TabPanel>
                    {
                        subCategoryItems.map(item =>
                                <TabPanel key={item.ID} value={value} index={item.ID}>
                                    <Col xs={12} sm>
                                        <div className={"d-flex flex-row flex-wrap mt-4"}>
                                            {slicedData.length ? slicedData.map((item) =>
                                                    <Col key={item.id} xs={"6"} md={"6"} lg={"4"} xl={"3"}>
                                                        <HotNewsItem {...item}></HotNewsItem>
                                                    </Col>) :
                                                <Col>
                                                    <h2 className={"text-center my-4"}>هیچ موردی برای نمایش یافت
                                                        نشد</h2>
                                                </Col>
                                            }
                                        </div>
                                    </Col>
                                </TabPanel>
                        )
                    }
                </Box>
                <div className={"d-flex flex-column align-items-center mt-5"}>
                    <Pagination count={Number(pageCount)} size={"large"} defaultPage={Number(pageNumber)}
                                onChange={(event) => handlePage(event)}
                    />
                </div>
            </div>
        </div>
    )
}


export async function getServerSideProps(context) {
    // the postItems that given to page as props
    let allData;
    // -----------------------
    let slicedData;
    // URL params that params.props[0] is category title and params.props[1] is page number of content
    const {params} = context;
    // -----------------------
    // pagination parameters
    const pageItemsCount = 8
    const pageNumber = params.props[1] ? params.props[1] : 1
    const startIndex = pageItemsCount * pageNumber - pageItemsCount
    const endIndex = pageItemsCount * pageNumber
    // ---------------------
    // fetch category title in URL for validation (if category is valid categoryList.length should be > 0)
    const category = await fetch(`http://localhost:4000/categories?title=${params.props[0]}`)
    const categoryList = await category.json()
    // -----------------------
    if (categoryList.length && params.props.length <= 2) {
        const response = await fetch(`http://localhost:4000/posts?categoryID=${categoryList[0].ID}`)
        const data = await response.json()
        const categoryParentID = categoryList[0].parentID
        if (categoryParentID === 0) {
            const categoryRes = await fetch(`http://localhost:4000/categories?parentID=${categoryList[0].ID}`)
            const otherCategoryList = await categoryRes.json()
            let otherCategoryString = ""
            const otherCategoryListLength = otherCategoryList.length
            for (let i = 1; i <= otherCategoryListLength;) {
                otherCategoryString = otherCategoryString.concat(`${i === 1 ? "" : "&&categoryID="}${otherCategoryList[i - 1].ID}`)
                i++
            }
            const otherPostsRes = await fetch(`http://localhost:4000/posts?categoryID=${otherCategoryString}`)
            const otherPostList = await otherPostsRes.json()
            allData = [...data, ...otherPostList]
            slicedData = allData.slice(startIndex, endIndex)
        } else {
            allData = data
            slicedData = allData.slice(startIndex, endIndex)
        }
        const pageCount = Math.ceil(allData.length / pageItemsCount)
        if (pageCount >= pageNumber || pageCount === 0) {
            return {
                props: {slicedData, pageNumber, pageCount}
            }
        } else {
            return {
                notFound: true,
            }
        }
    } else {
        return {
            notFound: true,
        }
    }
}