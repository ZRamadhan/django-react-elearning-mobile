'using strict';

const initialState = {
  lknTableData:[],
  userTableData:[],
  userData: [],
  prosesTersangka: [],
  prosesTersangkaData: [],
  filter: {
    type: 'TODAY',
    startDate: null,
    endDate: null,
    keyword: '',
  },
  error: false,
  lknData: [],
  selectedPnkpId: null,
  selectedLknId: null,
  bbStatus: [],
  statusBBData: [],
  lknCreated: false,
  penangkapanData: [],
  statusTersangkaDataByPnkp: [],
  statusTersangkaData: [],
  penangkapanSelectedData: {},
  tersangkaTableData: [],
  tersangkaTableDataByLkn: [],
  tersangkaData: {},
  bbTableData: [],
  bbData: [],
  bbDataByPnkp: [],
  prosesIndex: [],
};
const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return {
        ...state,
        filter: {
          keyword: '',
          type: action.filter.type,
          startDate: action.filter.startDate,
          endDate: action.filter.endDate
        }
      }
    };
    case 'SET_KEYWORD': {
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action.keyword,
        }
      }
    };
    case 'RECEIVE_LKN_TABLE_DATA':
      return {
        ...state,
        lknTableData: action.data,
      };
    case 'SET_SELECTED_LKN_ID':
      return {
        ...state,
        selectedLknId: action.id,
      }
    case 'SET_SELECTED_PNKP_ID':
      return {
        ...state,
        selectedPnkpId: action.id,
      }
    case 'RESET_LKN_TABLE':
      return {
        ...state,
        lknTableData: [],
      }
    case 'RECEIVE_LKN_DATA':
      return {
        ...state,
        lknData: action.data,
      };
    case 'RECEIVE_PROSES':
      return {
        ...state,
        prosesIndex: action.data,
      };
    case 'RECEIVE_PENANGKAPAN_BY_NO_LKN_DATA':
      return {
        ...state,
        penangkapanData: action.data,
      }
    case 'RECEIVE_PENANGKAPAN_BY_ID':
      return {
        ...state,
        penangkapanSelectedData: action.data,
      }
    case 'RECEIVE_TERSANGKA_TABLE_DATA':
      return {
        ...state,
        tersangkaTableData: action.data,
      };
    case 'RECEIVE_TERSANGKA_TABLE_DATA_BY_LKN':
      return {
        ...state,
        tersangkaTableDataByLkn: action.data,
      };
    case 'RECEIVE_TERSANGKA_DATA':
      return {
        ...state,
        tersangkaData: action.data,
      }
    case 'RECEIVE_BB_TABLE_DATA':
      return {
        ...state,
        bbTableData: action.data,
      };
    case 'RECEIVE_BB_DATA':
      return {
        ...state,
        bbData: action.data,
      };
    case 'RECEIVE_STATUS_BB':
      return {
        ...state,
        bbStatus: action.data,
      };
    case 'RECEIVE_STATUS_BB_DATA':
      return {
        ...state,
        statusBBData: action.data,
      };
    case 'RECEIVE_BB_DATA_BY_PNKP':
      return {
        ...state,
        bbDataByPnkp: action.data,
      };
    case 'RECEIVE_STATUS_TERSANGKA':
      return {
        ...state,
        statusTersangkaDataByPnkp: action.data,
      };
    case 'RECEIVE_STATUS_TERSANGKA_DATA':
      return {
        ...state,
        statusTersangkaData: action.data,
      };
    case 'RECEIVE_PROSES_TERSANGKA':
      return {
        ...state,
        prosesTersangka: action.data,
      };
    case 'RECEIVE_PROSES_TERSANGKA_DATA':
      return {
        ...state,
        prosesTersangkaData: action.data,
      };
    case 'RECEIVE_USER_TABLE_DATA':
      return {
        ...state,
        userTableData: action.data,
      };
    case 'RECEIVE_USER_DATA':
      return {
        ...state,
        userData: action.data,
      };
    case 'RECEIVE_LKN_CREATED_SUCCESSFULL':
      return {
        ...state,
        lknCreated: true,
        error: false,
      }
    case 'RECEIVE_ERROR':
      return {
        ...state,
        error: true,
      }
    case 'RECEIVE_LKN_BY_NO_LKN_DATA':
      return {
        ...state,
        lknData: action.data,
      }
    case 'RECEIVE_PENANGKAPAN':
      return {
        ...state,
        penangkapanData: action.data,
      };
    default:
      return state;

  }
};

export default dashboard;
