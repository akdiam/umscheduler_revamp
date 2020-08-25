import React, { useState, useMemo, useCallback } from 'react';
import { FormatClass } from './FormatClass';
import { store } from '../Store';
import Accordian from '@material-ui/core/Accordion';
import AccordianSummary from '@material-ui/core/AccordionSummary';
import AccordianDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { TypeAccordian } from './TypeAccordian';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { Themes } from '../Themes/Themes';
import './IndivClass.css';

const theme = createMuiTheme({
    typography: {
        subtitle2: {
            fontSize:20,
            fontWeight: 2000,
        },
    }
});

export const IndivClass = React.memo(({ class_name, indiv_scheduled_class, indiv_class_title, indiv_theme, removeClass, removeThemeFromObj, removeTitle }) => {
    //const { scheduledClasses, classTitles, removeClass, themeObj, removeThemeFromObj, removeTitle } = store();
    //const { removeClass, removeThemeFromObj, removeTitle } = store();
    console.log('render')
    //const removeClass = store(removeclass)
    const classObj = indiv_scheduled_class;
    const keys = Object.keys(classObj);
    const title = indiv_class_title;
    //const [isExpanded, changeExpansion] = useState(true);

    const COLOR_SCHEME = Themes[indiv_theme];
    const accordianTheme = createMuiTheme({
        overrides: {
            MuiAccordionDetails: {
                root: {
                    padding: '0px 0px 0px',
                },
            },
            MuiButtonBase: {
                root: {
                    backgroundColor: COLOR_SCHEME.main,
                }
            }
        },
    });

    /*const updateDisplays = () => {
        let dispObj = {};
        for (let key in keys) {
            switch (keys[key]) {
                case 'LEC': dispObj['Lectures'] = FormatClass(classObj[keys[key]]); break;
                case 'DIS': dispObj['Discussions'] = FormatClass(classObj[keys[key]]); break;
                case 'LAB': dispObj['Labs'] = FormatClass(classObj[keys[key]]); break;
                case 'SEM': dispObj['Seminars'] = FormatClass(classObj[keys[key]]); break;
                case 'REC': dispObj['Recitations'] = FormatClass(classObj[keys[key]]); break;
            }
        }
        updateInfo(dispObj);
        return dispObj;
    }*/

    //const dispObj = updateDisplays();
    let dispObj = {};
    for (let key in keys) {
        switch (keys[key]) {
            case 'LEC': dispObj['Lectures'] = FormatClass(classObj[keys[key]]); break;
            case 'DIS': dispObj['Discussions'] = FormatClass(classObj[keys[key]]); break;
            case 'LAB': dispObj['Labs'] = FormatClass(classObj[keys[key]]); break;
            case 'SEM': dispObj['Seminars'] = FormatClass(classObj[keys[key]]); break;
            case 'REC': dispObj['Recitations'] = FormatClass(classObj[keys[key]]); break;
        }
    }

    let is_msg = '';
    if (dispObj == {}) {
        is_msg = 'Independent Study';
    }
    
    const display_keys = Object.keys(dispObj);

    const delClass = event => {
        /*let temp_classes = scheduledClasses;
        delete temp_classes[class_name];*/
        removeClass(class_name);

        /*let temp_obj = themeObj;
        delete temp_obj[class_name];*/
        //const index = themeObj[class_name];
        removeThemeFromObj( class_name );

        /*let temp_titles = classTitles;
        delete temp_titles[class_name];*/
        removeTitle(class_name);
        event.stopPropagation();
    }

    /*const handleChange = () => {
        let new_expanded = !isExpanded;
        changeExpansion(new_expanded);
    }*/

    return (
        <div className="parent">
            <ThemeProvider theme={accordianTheme}>
            <Grid item xs = {12}>
                <Accordian
                defaultExpanded={true}
                >
                    <AccordianSummary
                    expandIcon={<ExpandMoreIcon/>}
                    >   
                        <ThemeProvider theme={theme}>
                            <Grid container spacing={0} direction="column">
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2">
                                    {class_name} 
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                    {title}
                                    </Typography>   
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                        <IconButton
                        onClick={delClass}>
                            <DeleteIcon/>
                        </IconButton>
                    </AccordianSummary>
                    <AccordianDetails>
                        <Grid container spacing = {0} direction="row">
                        {is_msg === '' ? 
                        display_keys.map((item, index) => {
                            return (
                                <TypeAccordian
                                display_type={item}
                                display_object={dispObj[item]}
                                key={item}
                                class_name={class_name}
                                colorScheme={COLOR_SCHEME}/>
                            )
                        }) : 
                        <Grid item xs = {12}>
                        <Typography>{is_msg}sss</Typography> </Grid> }
                        </Grid>
                    </AccordianDetails>
                </Accordian>
            </Grid>
            </ThemeProvider>
        </div>
    )
})