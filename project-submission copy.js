'use client';

import { Knock } from '@knocklabs/node';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useWebSocket from 'hooks/useWebSocket';

// material-ui
import {
  Snackbar,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Checkbox,
  Divider,
  Autocomplete,
  Box
} from '@mui/material';
import { InfoCircleFilled } from '@ant-design/icons';
import CheckIcon from '@mui/icons-material/Check';

// project imports
import MainCard from 'components/MainCard';
import useUser from '../hooks/useUser';

const countries = [
  { code: 'AD', label: 'Andorra', phone: '376' },
  {
    code: 'AE',
    label: 'United Arab Emirates',
    phone: '971'
  },
  { code: 'AF', label: 'Afghanistan', phone: '93' },
  {
    code: 'AG',
    label: 'Antigua and Barbuda',
    phone: '1-268'
  },
  { code: 'AI', label: 'Anguilla', phone: '1-264' },
  { code: 'AL', label: 'Albania', phone: '355' },
  { code: 'AM', label: 'Armenia', phone: '374' },
  { code: 'AO', label: 'Angola', phone: '244' },
  { code: 'AQ', label: 'Antarctica', phone: '672' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AT', label: 'Austria', phone: '43' },
  {
    code: 'AU',
    label: 'Australia',
    phone: '61',
    suggested: true
  },
  { code: 'AW', label: 'Aruba', phone: '297' },
  { code: 'AX', label: 'Alland Islands', phone: '358' },
  { code: 'AZ', label: 'Azerbaijan', phone: '994' },
  {
    code: 'BA',
    label: 'Bosnia and Herzegovina',
    phone: '387'
  },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BD', label: 'Bangladesh', phone: '880' },
  { code: 'BE', label: 'Belgium', phone: '32' },
  { code: 'BF', label: 'Burkina Faso', phone: '226' },
  { code: 'BG', label: 'Bulgaria', phone: '359' },
  { code: 'BH', label: 'Bahrain', phone: '973' },
  { code: 'BI', label: 'Burundi', phone: '257' },
  { code: 'BJ', label: 'Benin', phone: '229' },
  { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { code: 'BM', label: 'Bermuda', phone: '1-441' },
  { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brazil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BT', label: 'Bhutan', phone: '975' },
  { code: 'BV', label: 'Bouvet Island', phone: '47' },
  { code: 'BW', label: 'Botswana', phone: '267' },
  { code: 'BY', label: 'Belarus', phone: '375' },
  { code: 'BZ', label: 'Belize', phone: '501' },
  {
    code: 'CA',
    label: 'Canada',
    phone: '1',
    suggested: true
  },
  {
    code: 'CC',
    label: 'Cocos (Keeling) Islands',
    phone: '61'
  },
  {
    code: 'CD',
    label: 'Congo, Democratic Republic of the',
    phone: '243'
  },
  {
    code: 'CF',
    label: 'Central African Republic',
    phone: '236'
  },
  {
    code: 'CG',
    label: 'Congo, Republic of the',
    phone: '242'
  },
  { code: 'CH', label: 'Switzerland', phone: '41' },
  { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { code: 'CK', label: 'Cook Islands', phone: '682' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CM', label: 'Cameroon', phone: '237' },
  { code: 'CN', label: 'China', phone: '86' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CV', label: 'Cape Verde', phone: '238' },
  { code: 'CW', label: 'Curacao', phone: '599' },
  { code: 'CX', label: 'Christmas Island', phone: '61' },
  { code: 'CY', label: 'Cyprus', phone: '357' },
  { code: 'CZ', label: 'Czech Republic', phone: '420' },
  {
    code: 'DE',
    label: 'Germany',
    phone: '49',
    suggested: true
  },
  { code: 'DJ', label: 'Djibouti', phone: '253' },
  { code: 'DK', label: 'Denmark', phone: '45' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  {
    code: 'DO',
    label: 'Dominican Republic',
    phone: '1-809'
  },
  { code: 'DZ', label: 'Algeria', phone: '213' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'EE', label: 'Estonia', phone: '372' },
  { code: 'EG', label: 'Egypt', phone: '20' },
  { code: 'EH', label: 'Western Sahara', phone: '212' },
  { code: 'ER', label: 'Eritrea', phone: '291' },
  { code: 'ES', label: 'Spain', phone: '34' },
  { code: 'ET', label: 'Ethiopia', phone: '251' },
  { code: 'FI', label: 'Finland', phone: '358' },
  { code: 'FJ', label: 'Fiji', phone: '679' },
  {
    code: 'FK',
    label: 'Falkland Islands (Malvinas)',
    phone: '500'
  },
  {
    code: 'FM',
    label: 'Micronesia, Federated States of',
    phone: '691'
  },
  { code: 'FO', label: 'Faroe Islands', phone: '298' },
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true
  },
  { code: 'GA', label: 'Gabon', phone: '241' },
  { code: 'GB', label: 'United Kingdom', phone: '44' },
  { code: 'GD', label: 'Grenada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GF', label: 'French Guiana', phone: '594' },
  { code: 'GG', label: 'Guernsey', phone: '44' },
  { code: 'GH', label: 'Ghana', phone: '233' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GL', label: 'Greenland', phone: '299' },
  { code: 'GM', label: 'Gambia', phone: '220' },
  { code: 'GN', label: 'Guinea', phone: '224' },
  { code: 'GP', label: 'Guadeloupe', phone: '590' },
  { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { code: 'GR', label: 'Greece', phone: '30' },
  {
    code: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
    phone: '500'
  },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'GU', label: 'Guam', phone: '1-671' },
  { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { code: 'GY', label: 'Guyana', phone: '592' },
  { code: 'HK', label: 'Hong Kong', phone: '852' },
  {
    code: 'HM',
    label: 'Heard Island and McDonald Islands',
    phone: '672'
  },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'HR', label: 'Croatia', phone: '385' },
  { code: 'HT', label: 'Haiti', phone: '509' },
  { code: 'HU', label: 'Hungary', phone: '36' },
  { code: 'ID', label: 'Indonesia', phone: '62' },
  { code: 'IE', label: 'Ireland', phone: '353' },
  { code: 'IL', label: 'Israel', phone: '972' },
  { code: 'IM', label: 'Isle of Man', phone: '44' },
  { code: 'IN', label: 'India', phone: '91' },
  {
    code: 'IO',
    label: 'British Indian Ocean Territory',
    phone: '246'
  },
  { code: 'IQ', label: 'Iraq', phone: '964' },
  {
    code: 'IR',
    label: 'Iran, Islamic Republic of',
    phone: '98'
  },
  { code: 'IS', label: 'Iceland', phone: '354' },
  { code: 'IT', label: 'Italy', phone: '39' },
  { code: 'JE', label: 'Jersey', phone: '44' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'JO', label: 'Jordan', phone: '962' },
  {
    code: 'JP',
    label: 'Japan',
    phone: '81',
    suggested: true
  },
  { code: 'KE', label: 'Kenya', phone: '254' },
  { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { code: 'KH', label: 'Cambodia', phone: '855' },
  { code: 'KI', label: 'Kiribati', phone: '686' },
  { code: 'KM', label: 'Comoros', phone: '269' },
  {
    code: 'KN',
    label: 'Saint Kitts and Nevis',
    phone: '1-869'
  },
  {
    code: 'KP',
    label: "Korea, Democratic People's Republic of",
    phone: '850'
  },
  { code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { code: 'KW', label: 'Kuwait', phone: '965' },
  { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { code: 'KZ', label: 'Kazakhstan', phone: '7' },
  {
    code: 'LA',
    label: "Lao People's Democratic Republic",
    phone: '856'
  },
  { code: 'LB', label: 'Lebanon', phone: '961' },
  { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { code: 'LI', label: 'Liechtenstein', phone: '423' },
  { code: 'LK', label: 'Sri Lanka', phone: '94' },
  { code: 'LR', label: 'Liberia', phone: '231' },
  { code: 'LS', label: 'Lesotho', phone: '266' },
  { code: 'LT', label: 'Lithuania', phone: '370' },
  { code: 'LU', label: 'Luxembourg', phone: '352' },
  { code: 'LV', label: 'Latvia', phone: '371' },
  { code: 'LY', label: 'Libya', phone: '218' },
  { code: 'MA', label: 'Morocco', phone: '212' },
  { code: 'MC', label: 'Monaco', phone: '377' },
  {
    code: 'MD',
    label: 'Moldova, Republic of',
    phone: '373'
  },
  { code: 'ME', label: 'Montenegro', phone: '382' },
  {
    code: 'MF',
    label: 'Saint Martin (French part)',
    phone: '590'
  },
  { code: 'MG', label: 'Madagascar', phone: '261' },
  { code: 'MH', label: 'Marshall Islands', phone: '692' },
  {
    code: 'MK',
    label: 'Macedonia, the Former Yugoslav Republic of',
    phone: '389'
  },
  { code: 'ML', label: 'Mali', phone: '223' },
  { code: 'MM', label: 'Myanmar', phone: '95' },
  { code: 'MN', label: 'Mongolia', phone: '976' },
  { code: 'MO', label: 'Macao', phone: '853' },
  {
    code: 'MP',
    label: 'Northern Mariana Islands',
    phone: '1-670'
  },
  { code: 'MQ', label: 'Martinique', phone: '596' },
  { code: 'MR', label: 'Mauritania', phone: '222' },
  { code: 'MS', label: 'Montserrat', phone: '1-664' },
  { code: 'MT', label: 'Malta', phone: '356' },
  { code: 'MU', label: 'Mauritius', phone: '230' },
  { code: 'MV', label: 'Maldives', phone: '960' },
  { code: 'MW', label: 'Malawi', phone: '265' },
  { code: 'MX', label: 'Mexico', phone: '52' },
  { code: 'MY', label: 'Malaysia', phone: '60' },
  { code: 'MZ', label: 'Mozambique', phone: '258' },
  { code: 'NA', label: 'Namibia', phone: '264' },
  { code: 'NC', label: 'New Caledonia', phone: '687' },
  { code: 'NE', label: 'Niger', phone: '227' },
  { code: 'NF', label: 'Norfolk Island', phone: '672' },
  { code: 'NG', label: 'Nigeria', phone: '234' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Netherlands', phone: '31' },
  { code: 'NO', label: 'Norway', phone: '47' },
  { code: 'NP', label: 'Nepal', phone: '977' },
  { code: 'NR', label: 'Nauru', phone: '674' },
  { code: 'NU', label: 'Niue', phone: '683' },
  { code: 'NZ', label: 'New Zealand', phone: '64' },
  { code: 'OM', label: 'Oman', phone: '968' },
  { code: 'PA', label: 'Panama', phone: '507' },
  { code: 'PE', label: 'Peru', phone: '51' },
  { code: 'PF', label: 'French Polynesia', phone: '689' },
  { code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { code: 'PH', label: 'Philippines', phone: '63' },
  { code: 'PK', label: 'Pakistan', phone: '92' },
  { code: 'PL', label: 'Poland', phone: '48' },
  {
    code: 'PM',
    label: 'Saint Pierre and Miquelon',
    phone: '508'
  },
  { code: 'PN', label: 'Pitcairn', phone: '870' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  {
    code: 'PS',
    label: 'Palestine, State of',
    phone: '970'
  },
  { code: 'PT', label: 'Portugal', phone: '351' },
  { code: 'PW', label: 'Palau', phone: '680' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'QA', label: 'Qatar', phone: '974' },
  { code: 'RE', label: 'Reunion', phone: '262' },
  { code: 'RO', label: 'Romania', phone: '40' },
  { code: 'RS', label: 'Serbia', phone: '381' },
  { code: 'RU', label: 'Russian Federation', phone: '7' },
  { code: 'RW', label: 'Rwanda', phone: '250' },
  { code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { code: 'SB', label: 'Solomon Islands', phone: '677' },
  { code: 'SC', label: 'Seychelles', phone: '248' },
  { code: 'SD', label: 'Sudan', phone: '249' },
  { code: 'SE', label: 'Sweden', phone: '46' },
  { code: 'SG', label: 'Singapore', phone: '65' },
  { code: 'SH', label: 'Saint Helena', phone: '290' },
  { code: 'SI', label: 'Slovenia', phone: '386' },
  {
    code: 'SJ',
    label: 'Svalbard and Jan Mayen',
    phone: '47'
  },
  { code: 'SK', label: 'Slovakia', phone: '421' },
  { code: 'SL', label: 'Sierra Leone', phone: '232' },
  { code: 'SM', label: 'San Marino', phone: '378' },
  { code: 'SN', label: 'Senegal', phone: '221' },
  { code: 'SO', label: 'Somalia', phone: '252' },
  { code: 'SR', label: 'Suriname', phone: '597' },
  { code: 'SS', label: 'South Sudan', phone: '211' },
  {
    code: 'ST',
    label: 'Sao Tome and Principe',
    phone: '239'
  },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  {
    code: 'SX',
    label: 'Sint Maarten (Dutch part)',
    phone: '1-721'
  },
  {
    code: 'SY',
    label: 'Syrian Arab Republic',
    phone: '963'
  },
  { code: 'SZ', label: 'Swaziland', phone: '268' },
  {
    code: 'TC',
    label: 'Turks and Caicos Islands',
    phone: '1-649'
  },
  { code: 'TD', label: 'Chad', phone: '235' },
  {
    code: 'TF',
    label: 'French Southern Territories',
    phone: '262'
  },
  { code: 'TG', label: 'Togo', phone: '228' },
  { code: 'TH', label: 'Thailand', phone: '66' },
  { code: 'TJ', label: 'Tajikistan', phone: '992' },
  { code: 'TK', label: 'Tokelau', phone: '690' },
  { code: 'TL', label: 'Timor-Leste', phone: '670' },
  { code: 'TM', label: 'Turkmenistan', phone: '993' },
  { code: 'TN', label: 'Tunisia', phone: '216' },
  { code: 'TO', label: 'Tonga', phone: '676' },
  { code: 'TR', label: 'Turkey', phone: '90' },
  {
    code: 'TT',
    label: 'Trinidad and Tobago',
    phone: '1-868'
  },
  { code: 'TV', label: 'Tuvalu', phone: '688' },
  {
    code: 'TW',
    label: 'Taiwan',
    phone: '886'
  },
  {
    code: 'TZ',
    label: 'United Republic of Tanzania',
    phone: '255'
  },
  { code: 'UA', label: 'Ukraine', phone: '380' },
  { code: 'UG', label: 'Uganda', phone: '256' },
  {
    code: 'US',
    label: 'United States',
    phone: '1',
    suggested: true
  },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'UZ', label: 'Uzbekistan', phone: '998' },
  {
    code: 'VA',
    label: 'Holy See (Vatican City State)',
    phone: '379'
  },
  {
    code: 'VC',
    label: 'Saint Vincent and the Grenadines',
    phone: '1-784'
  },
  { code: 'VE', label: 'Venezuela', phone: '58' },
  {
    code: 'VG',
    label: 'British Virgin Islands',
    phone: '1-284'
  },
  {
    code: 'VI',
    label: 'US Virgin Islands',
    phone: '1-340'
  },
  { code: 'VN', label: 'Vietnam', phone: '84' },
  { code: 'VU', label: 'Vanuatu', phone: '678' },
  { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { code: 'WS', label: 'Samoa', phone: '685' },
  { code: 'XK', label: 'Kosovo', phone: '383' },
  { code: 'YE', label: 'Yemen', phone: '967' },
  { code: 'YT', label: 'Mayotte', phone: '262' },
  { code: 'ZA', label: 'South Africa', phone: '27' },
  { code: 'ZM', label: 'Zambia', phone: '260' },
  { code: 'ZW', label: 'Zimbabwe', phone: '263' }
];

// ==============================|| PROJECT SUBMISSION PAGE ||============================== //

function isValidEmail(email) {
  // Regular expression for validating an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const ProjectSubmissionPage = () => {
  const { sendMessage } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_URL}?&api_key=${process.env.NEXT_PUBLIC_KNOCK_API_KEY}`);
  const user = useUser('external');
  const router = useRouter();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [companies, setCompanies] = useState();
  const [showCompanyExists, setShowCompanyExists] = useState(false);
  const [showCompanyUndefined, setShowCompanyUndefined] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  useEffect(() => {
    fetch(`/api/companies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch companies');
        }
        return res.json();
      })
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching project data:', error);
      });
  }, []);

  const initialChecklistList = {
    'AI for Biomedicine': false,
    'App Engineering': false,
    Finance: false,
    General: false,
    'Healthcare + AI for Sustainable Development': false,
    IoT: false,
    'Machine Learning': false,
    Robotics: false
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    companyRegistrationName: '',
    signatoryFirstName: '',
    signatoryLastName: '',
    signatoryEmail: '',
    signatoryPosition: '',
    projectType: 'Group',
    numberStudents: 1,
    checklistAcademicDomains: initialChecklistList,
    keywords: [],
    skills: [],
    basedOnData: false,
    identifiedDataset: false,
    anonymousData: false,
    identifiesPeople: false,
    individualData: false,
    accessType: 'public',
    locationPreference: 'remote',
    countryOfOperation: '',
    companyDescription: '',
    companyAddress: ''
    // Add more fields as needed
  });

  const [currentKeyword, setCurrentKeyword] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the event target is a checkbox, handle it accordingly
    if (type === 'checkbox') {
      const updatedChecklist = initialChecklistList;
      updatedChecklist[name] = checked;
      setFormData({
        ...formData,
        checklistAcademicDomains: updatedChecklist
      });
    } else if (name === 'keywords') {
      setCurrentKeyword(value);
    } else if (name === 'skills') {
      setCurrentSkill(value);
    } else {
      setFormData({
        ...formData,
        [name]: value === 'true' || value === 'false' ? value === 'true' : value // Convert string back to boolean if necessary
      });
    }
  };

  const handleEmailBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'signatoryEmail' && value.trim() !== '' && !isValidEmail(value)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const handleCountryChange = (event, value) => {
    setFormData({
      ...formData,
      countryOfOperation: value?.label || '' // Assuming you want to store the label of the selected country
    });
  };

  const addKeyword = () => {
    const updatedKeywords = formData.keywords;
    updatedKeywords.push(currentKeyword);
    setFormData({
      ...formData,
      keywords: updatedKeywords
    });
    setCurrentKeyword('');
  };

  const deleteKeyword = (keywordToDelete) => {
    const updatedKeywords = formData.keywords.filter((keyword) => keyword !== keywordToDelete);
    setFormData({
      ...formData,
      keywords: updatedKeywords
    });
  };

  const addSkill = () => {
    const updatedSkills = formData.skills;
    updatedSkills.push(currentSkill);
    setFormData({
      ...formData,
      skills: updatedSkills
    });
    setCurrentSkill('');
  };

  const deleteSkill = (skillToDelete) => {
    const updatedSkills = formData.skills.filter((skill) => skill !== skillToDelete);
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      title: formData.title,
      academicDomains: Object.keys(formData.checklistAcademicDomains).filter((key) => formData.checklistAcademicDomains[key]),
      userId: user.id
    };
    const academicDomains = Object.keys(formData.checklistAcademicDomains).filter((key) => formData.checklistAcademicDomains[key]);
    if (academicDomains.length === 0) {
      setOpenSnackbar(true);
    } else {
      try {
        createProject(formData, academicDomains[0]);
        sendMessage({ type: 'project-submission', data: projectData });

        console.log('Triggering workflow for user:', user.id);
        console.log('Academic domain:', academicDomains[0]);

        const response = await fetch(`/api/notifications-api`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectData)
        });
        if (!response.ok) {
          throw new Error('Error triggering workflow');
        }

        const data = await response.json();
        console.log('Workflow triggered:', data);
      } catch (error) {
        console.error('Error triggering workflow:', error);
      }
    }
  };

  const createProject = async (formData, academicDomain) => {
    try {
      // Get the current date and time
      const submissionDate = new Date();

      const response = await fetch('/api/externalprojects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          keywords: formData.keywords,
          skills: formData.skills,
          isDataAvailable: formData.basedOnData,
          locationPreference: [formData.locationPreference],
          submissionDate: submissionDate, // Include submission date
          status: 'NOTYETAPPROVED',
          userId: user.id,
          academicDomain: academicDomain,
          partnerSignatoryFirstName: formData.signatoryFirstName,
          partnerSignatoryLastName: formData.signatoryLastName,
          partnerSignatoryEmail: formData.signatoryEmail,
          partnerSignatoryPosition: formData.signatoryPosition,
          companyRegistrationName: formData.companyRegistrationName,
          companyDescription: formData.companyDescription,
          companyAddress: formData.companyAddress,
          countryOfOperation: formData.countryOfOperation
        })
      });
      const data = await response.json();
      setOpenSuccess(true);
    } catch (error) {
      console.error('Error creating project:', error);
      setOpenFail(true);
    }
  };

  const handleClose = () => {
    router.push('/external/my-projects');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const verifyCompany = () => {
    const currentCompany = companies.find((company) => company.legalName.toLowerCase() === formData.companyRegistrationName.toLowerCase());

    if (currentCompany) {
      setShowCompanyUndefined(false);
      setShowCompanyExists(true);
      setFormData({
        ...formData,
        ['companyDescription']: currentCompany.description,
        ['companyAddress']: currentCompany.address
      });
    } else {
      setShowCompanyUndefined(true);
      setShowCompanyExists(false);
      setFormData({
        ...formData,
        ['companyDescription']: '',
        ['companyAddress']: ''
      });
    }
  };

  if (isLoading) return <p>Loading ...</p>;

  return (
    <MainCard>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackbar(false);
          }}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Please select an academic domain!
        </Alert>
      </Snackbar>

      {/* Dialog Components */}
      <Dialog open={openSuccess} onClose={handleClose}>
        <DialogTitle id="modal-modal-title">Your project has been created!</DialogTitle>
        <DialogContent>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your project will automatically be redirected to the relevant academics. Thank you for your time!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openFail} onClose={handleClose}>
        <DialogTitle id="modal-modal-title">There has been an issue :(</DialogTitle>
        <DialogContent>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The creation of your project failed. Please try again later.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h1" style={{ marginBottom: '20px' }}>
        Submit a project
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          margin="normal"
          variant="outlined"
          label="Project title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          style={{ width: '300px' }}
          required
          onKeyDown={handleKeyDown}
        />
        <TextField
          margin="normal"
          variant="outlined"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          helperText="max 250 characters"
          inputProps={{ maxLength: 250 }}
          required
          onKeyDown={handleKeyDown}
        />
        <div>
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }}>Company</Divider>
          <Typography variant="h5" style={{ marginBottom: '10px' }}>
            Please provide your company's registration name:{' '}
          </Typography>
          <Alert color="error" variant="border" icon={<InfoCircleFilled />} style={{ marginBottom: '20px' }}>
            <AlertTitle>Registration name</AlertTitle>
            <Typography variant="h6">
              {' '}
              This is the name that will be used for official contracts. Please make sure it is the complete registered name of your
              company.
            </Typography>
          </Alert>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <TextField
              margin="normal"
              variant="outlined"
              label="Company registration name"
              name="companyRegistrationName"
              value={formData.companyRegistrationName}
              onChange={handleChange}
              style={{ width: 300, marginRight: '20px' }}
              required
              onKeyDown={handleKeyDown}
            />
            <Button variant="outlined" color="primary" onClick={verifyCompany} style={{ marginRight: '20px' }}>
              Autocomplete
            </Button>
            {showCompanyExists && <CheckIcon color="success" />}
            {showCompanyUndefined && (
              <Alert color="info" variant="border" icon={<InfoCircleFilled />}>
                <Typography variant="h6">
                  {' '}
                  This company is not registered yet. Please complete the following form to register your company.
                </Typography>
              </Alert>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              margin="normal"
              variant="outlined"
              label="Company description"
              name="companyDescription"
              value={formData.companyDescription}
              onChange={handleChange}
              required
              onKeyDown={handleKeyDown}
            />
            <TextField
              margin="normal"
              variant="outlined"
              label="Company address"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              required
              onKeyDown={handleKeyDown}
              style={{ width: '500px' }}
            />
          </div>
          <Typography variant="h5" style={{ marginBottom: '10px', marginTop: '10px' }}>
            Country of operation:{' '}
          </Typography>
          <Autocomplete
            id="country-select"
            sx={{ width: 300 }}
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            onChange={handleCountryChange}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
                required
                onKeyDown={handleKeyDown}
              />
            )}
          />
        </div>

        <Typography variant="h5" style={{ marginTop: '10px' }}>
          Details of the person responsible for signing contracts linked to this project:
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <TextField
            margin="normal"
            variant="outlined"
            label="First name"
            name="signatoryFirstName"
            value={formData.signatoryFirstName}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
            required
            onKeyDown={handleKeyDown}
          />
          <TextField
            margin="normal"
            variant="outlined"
            label="Last name"
            name="signatoryLastName"
            value={formData.signatoryLastName}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
            required
            onKeyDown={handleKeyDown}
          />
          <TextField
            margin="normal"
            variant="outlined"
            label="Email"
            name="signatoryEmail"
            value={formData.signatoryEmail}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
            required
            onKeyDown={handleKeyDown}
            onBlur={handleEmailBlur}
          />
          {invalidEmail && (
            <Alert color="warning" variant="border" icon={<InfoCircleFilled />}>
              <Typography variant="h6"> This email format is invalid. Please double-check for any typos.</Typography>
            </Alert>
          )}
          <TextField
            margin="normal"
            variant="outlined"
            label="Position"
            name="signatoryPosition"
            value={formData.signatoryPosition}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
            required
            onKeyDown={handleKeyDown}
            onBlur={handleEmailBlur}
          />
        </div>

        <Divider style={{ marginTop: '10px', marginBottom: '10px' }}>PROJECT TEAM</Divider>
        <FormControl style={{ marginTop: '5px', marginBottom: '5px' }}>
          <FormLabel id="project-type">Project type</FormLabel>
          <RadioGroup name="projectType" value={formData.projectType} onChange={handleChange}>
            <FormControlLabel value="Group" control={<Radio />} label="Group" />
            <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
          </RadioGroup>
        </FormControl>
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }}>THEME(S)</Divider>
        <Typography variant="h5" style={{ marginTop: '7px' }}>
          Applicable academic domain for this project:
        </Typography>
        {Object.keys(formData.checklistAcademicDomains).map((key, index) => (
          <FormControlLabel
            key={index}
            name={key}
            control={<Checkbox checked={formData.checklistAcademicDomains[key]} />}
            label={key}
            onChange={handleChange}
          />
        ))}
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }}>DETAILS</Divider>
        <Typography variant="h5" style={{ marginTop: '7px' }}>
          Technical challenges including computer science themes:
        </Typography>
        <div style={{ display: 'flex', marginTop: '5px' }}>
          {formData.keywords &&
            formData.keywords.map((keyword) => (
              <Chip key={keyword} label={keyword} onDelete={() => deleteKeyword(keyword)} color="info" style={{ marginRight: '5px' }} />
            ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            margin="normal"
            variant="outlined"
            label="Keyword"
            name="keywords"
            value={currentKeyword}
            onChange={handleChange}
            style={{ marginRight: '5px' }}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={addKeyword}>Add keyword</Button>
        </div>

        <Typography variant="h5" style={{ marginTop: '7px' }}>
          Skills or technologies required:
        </Typography>
        <div style={{ display: 'flex', marginTop: '5px' }}>
          {formData.skills &&
            formData.skills.map((skill) => (
              <Chip key={skill} label={skill} onDelete={() => deleteSkill(skill)} color="info" style={{ marginRight: '5px' }} />
            ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            margin="normal"
            variant="outlined"
            label="Skill"
            name="skills"
            value={currentSkill}
            onChange={handleChange}
            style={{ marginRight: '5px' }}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={addSkill}>Add skill</Button>
        </div>

        <Divider style={{ marginTop: '10px', marginBottom: '10px' }}>DATA</Divider>

        <Typography variant="body1">Is the project based on data?</Typography>

        <RadioGroup
          name="basedOnData"
          value={formData.basedOnData.toString()} // Convert boolean to string
          onChange={handleChange}
          row
        >
          <FormControlLabel value="true" control={<Radio />} label="Yes" />
          <FormControlLabel value="false" control={<Radio />} label="No" />
        </RadioGroup>

        {formData.basedOnData === true && (
          <div style={{ marginLeft: '20px' }}>
            <Typography variant="body1">Have you identified the dataset?</Typography>
            <RadioGroup name="identifiedDataset" value={formData.identifiedDataset} onChange={handleChange} row>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>

            {formData.identifiedDataset === true && (
              <>
                <Typography variant="body1">Is the data anonymous?</Typography>
                <RadioGroup name="anonymousData" value={formData.anonymousData} onChange={handleChange} row>
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>

                <Typography variant="body1">Does the data pertain to individuals?</Typography>
                <RadioGroup name="individualData" value={formData.individualData} onChange={handleChange} row>
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>

                <Typography variant="body1">Does it identify people?</Typography>
                <RadioGroup name="identifiesPeople" value={formData.identifiesPeople} onChange={handleChange} row>
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>

                <Typography variant="body1">Is it public, private, or third party?</Typography>
                <RadioGroup name="accessType" value={formData.accessType} onChange={handleChange} row>
                  <FormControlLabel value="public" control={<Radio />} label="Public" />
                  <FormControlLabel value="private" control={<Radio />} label="Private" />
                  <FormControlLabel value="third-party" control={<Radio />} label="Third Party" />
                </RadioGroup>
              </>
            )}
          </div>
        )}

        <Divider style={{ marginTop: '10px', marginBottom: '10px' }}>LOCATION</Divider>
        <Typography variant="body1">Where will the student(s) be based?</Typography>
        <RadioGroup name="locationPreference" value={formData.locationPreference} onChange={handleChange} row>
          <FormControlLabel value="remote" control={<Radio />} label="Remote" />
          <FormControlLabel value="inOffice" control={<Radio />} label="In office" />
          <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
        </RadioGroup>

        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </form>
    </MainCard>
  );
};

export default ProjectSubmissionPage;
