import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        borderRadius: '0px'
    },
}));

const LeaveSummary = ({monthlySummary, getMonth, getYear}) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} accordion-box dasboard-accordion-box`}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={`${classes.heading} main-title`}>{`Leave Summary - ${getMonth}, ${getYear}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col"><p className='mb-0'>Ope</p><p className='mb-0'>Bal</p></th>
                                <th scope="col">Cre.</th>
                                <th scope="col">Uti</th>
                                <th scope="col"><p className='mb-0'>Clo.</p><p className='mb-0'>Bal</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">PL</th>
                                <td>{monthlySummary && monthlySummary.OpeningPL ? monthlySummary.OpeningPL : 0}</td>
                                <td>{monthlySummary && monthlySummary.PLCredit ? monthlySummary.PLCredit : 0}</td>
                                <td>{monthlySummary && monthlySummary.PL ? monthlySummary.PL : 0}</td>
                                <td>{monthlySummary && monthlySummary.ClosingPL ? monthlySummary.ClosingPL : 0}</td>
                            </tr>
                            <tr>
                                <th scope="row">SL</th>
                                <td>{monthlySummary && monthlySummary.OpeningSL ? monthlySummary.OpeningSL :0}</td>
                                <td>{monthlySummary && monthlySummary.SLCredit ? monthlySummary.SLCredit : 0}</td>
                                <td>{monthlySummary && monthlySummary.SL ? monthlySummary.SL : 0}</td>
                                <td>{monthlySummary && monthlySummary.ClosingSL ? monthlySummary.ClosingSL : 0}</td>
                            </tr>
                            <tr>
                                <th scope="row">CL</th>
                                <td>{monthlySummary && monthlySummary.OpeningPL ? monthlySummary.OpeningPL : 0}</td>
                                <td>{monthlySummary && monthlySummary.PLCredit ? monthlySummary.PLCredit : 0}</td>
                                <td>{monthlySummary && monthlySummary.PL ? monthlySummary.PL : 0}</td>
                                <td>{monthlySummary && monthlySummary.ClosingPL ? monthlySummary.ClosingPL : 0}</td>
                            </tr>
                            <tr>
                            <th scope="col"><p className='mb-0'>Late in /</p><p className='mb-0'>Early</p><p className='mb-0'>Leaving</p></th>
                                <td>-</td>
                                <td>{monthlySummary && monthlySummary.EarlyExitCredit ? monthlySummary.EarlyExitCredit : 0}</td>
                                <td>{monthlySummary && monthlySummary.EarlyExit ? monthlySummary.EarlyExit : 0}</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default LeaveSummary