import styles from "../../styles/SearchInputSection.module.css"
import {Fragment, useContext, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {Autocomplete} from "@mui/material";
import MenuContext from "@/Contexts/MenuContext";
import TextField from "@mui/material/TextField";
export default function SearchInputSection(){
    const [searchInput , setSearchInput] = useState("")
    const categories = useContext(MenuContext)
    // const categoryList = categories.categories.map(item => item.title)
    const submitHandler = (event) => {
        event.preventDefault()
    }
    return(
        <Fragment>
            <div className={`content d-flex flex-column col-xl col-12 shadow-sm py-3 gap-2 px-sm-4 px-2`}>
                <div className="d-flex flex-row">
                    <div className="title-parent w-100">
                        <h5 className="main-title- text-capitalize header-title">
                            جستجوی میان موضوعات
                        </h5>
                    </div>
                </div>
                <div className="col-12 d-flex flex-row justify-content-center justify-content-xl-start mb-2">
                    {/*<div className="col-12 col-lg-10 d-flex flex-column justify-content-center">*/}
                    {/*    <div className={`${styles.newsLetterEmailParent} d-flex flex-row justify-content-center`}>*/}
                    {/*        <Autocomplete*/}
                    {/*            disablePortal*/}
                    {/*            id="combo-box-demo"*/}
                    {/*            onChange={(event, value) => setSearchInput(value)}*/}
                    {/*            value={searchInput}*/}
                    {/*            options={categoryList}*/}
                    {/*            sx={{"& fieldset": {border: 'none'}, width : "80%"}}*/}
                    {/*            renderInput={(params) => <TextField className={styles.newsLetterEmailInput} {...params} label="موضوعات " />}*/}
                    {/*        />*/}
                    {/*        <button type="submit" className={`btn ${styles.newsLetterEmailBtn}`} onSubmit={submitHandler}>*/}
                    {/*            <SearchIcon></SearchIcon>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </Fragment>
    )
}