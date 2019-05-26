import React from 'react';
import { withStyles } from '@material-ui/core/styles';  
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MultipleSelect extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <InputLabel htmlFor="select-multiple-chip">Dans quel(s) pays ?</InputLabel>
        <Select
        multiple
        value={this.props.selectedArray}
        onChange={this.props.handleSelect}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
            <div className={classes.chips}>
            {this.props.selectedArray.map(value => (
                <Chip key={value.id} label={ this.props.array.find(item => item.id === value).name} className={classes.chip} />
                ))}
            </div>
        )}
        MenuProps={MenuProps}
        >
        {this.props.array.map(item => (
            <MenuItem key={item.id} value={item.id} >
            {item.name}
            </MenuItem>
        ))}
        </Select>
      </div>
    );
  }
}

export default withStyles(styles)(MultipleSelect);