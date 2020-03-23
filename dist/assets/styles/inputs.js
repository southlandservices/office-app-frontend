import colors from './colors';
import baseStyles from './base';

const textFieldRoot = theme => {
  return {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    }
  };
};

const textFieldInputBase = (theme, customStyles) => {
  return Object.assign({}, {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    fontSize: 16,
    padding: '.429rem 1.072rem',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    '&:disabled': {
      backgroundColor: '#eeeeee',
      cursor: 'not-allowed'
    }
  }, customStyles);
};

const textFieldInput = (theme, customStyles) => {
  return Object.assign({}, {
    border: '1px solid #ced4da'
  }, textFieldInputBase(theme, customStyles), customStyles);
};

const textFieldInputError = (theme, customStyles) => {
  return Object.assign({}, {
    border: `1px solid ${colors.error}`
  }, textFieldInputBase(theme, customStyles), customStyles);
};

const textFieldFormLabel = theme => {
  return Object.assign({}, baseStyles, {
    fontSize: '18px'
  });
};

const helperTextError = theme => {
  return Object.assign({}, {
    color: colors.error
  });
}

const extendStyles = (theme, customStyles) => (
  Object.assign({}, customStyles, {
    textFieldRoot: textFieldRoot(theme),
    textFieldInput: textFieldInput(theme, customStyles ? customStyles['textFieldInput'] : {}),
    textFieldInputError: textFieldInputError(theme, customStyles ? customStyles['textFieldInput'] : {}),
    textFieldFormLabel: textFieldFormLabel(theme),
    helperTextError: helperTextError(theme)
  })
);

export default extendStyles;
