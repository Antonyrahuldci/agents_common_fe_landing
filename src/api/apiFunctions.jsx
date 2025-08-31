import method from "./method";
const apiFunctions = {
  getagents: () => method.get("api/v1/agents"),
  userLogin: (payload) => method.post("api/v1/login", payload),
  socialLogin: (payload) => method.post("api/v1/sociallogin", payload),
  logout: (payload) => method.post("api/v1/logout", payload),
  userRegister: (payload) => method.post("api/v1/register", payload),
  verifyEmail: (payload) => method.get(`/api/v1/verify/${payload}`),

  getProfile: (payload) => method.get("/api/v1/get-profile"),
  updateProfile: (payload) =>
    method.put("api/v1/update-profile", payload, true),

  
  
  
  addevent: (payload) => method.post(`calendar/`, payload),
  updateevent: (payload) => method.put(`calendar/`, payload),
  getCalenderData: () => method.get(`calendar/`),
  deleteCalenderData: (payload) =>
    method.post(`calendar/delete_event`, payload),

  getDashboardData: () => method.get(`email/dashboard`),
  geteventsdata: () => method.get(`dashboard/upcoming-events`),
  getalertsdata: () => method.get(`dashboard/alerts`),
  getrecentactionsdata: () => method.get(`dashboard/recent-actions`),
  getAllEmails: () => method.get(`email/get_email_new`),
  getEmailsByFilter: (params) => method.get(`email/get_email?filter=${params}`),

  generateReply: (payload) => method.post("email/generate_reply", payload),
  saveDraft: (payload) => method.post("email/save_draft", payload),
  savePrefrence: (payload) => method.post("preferences", payload),

  // //Authentication Login
  // adminLogin: (payload) => method.post("api/auth/admin_login", payload),
  // forgetPassword: (payload) => method.post("api/auth/forget_password", payload),
  // resetPassword: (payload) => method.post("api/auth/reset_password", payload),
  // changePassword: (payload) => method.post("api/auth/change_password", payload),

  // //region Join Community
  // getJoinCommunity: () => method.get("api/common/get_join_community"),

  // //region Subscribed User
  // getSubscribedUsers: () => method.get("api/common/get_subscribe"),

  // //region Dashboard
  // getBlogCount: () => method.get("api/common/get_counts/blog"),
  // getQueriesCount: () => method.get("api/common/get_counts/user_notes"),
  // getCMSPagesCount: () => method.get("api/common/get_counts/pages"),

  // //region Blogs
  // //Categories
  // addBlogCategories: (payload) =>
  //   method.post("api/common/add_blog_category", payload),
  // updateBlogCategories: (payload) =>
  //   method.post("api/common/update_blog_category", payload),
  // getBlogCategories: () => method.get("api/common/get_blog_category"),
  // deleteBlogCategories: (payload) =>
  //   method.post("api/common/delete_blog_category", payload),
  // //Blogs
  // addBlogs: (payload) => method.post("api/common/add_blog", payload, true),
  // updateBlogs: (payload) =>
  //   method.post("api/common/update_blog", payload, true),
  // getBlogs: () => method.get("api/common/get_blogs"),
  // deleteBlogs: (payload) => method.post("api/common/delete_blog", payload),

  // //region Case Study
  // addCaseStudy: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/case_study/case_study_overview",
  //     payload,
  //     true
  //   ),
  // updateCaseStudy: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/case_study/case_study_overview",
  //     payload,
  //     true
  //   ),
  // getCaseStudy: () =>
  //   method.get("api/cms/get_multiple/case_study/case_study_overview"),
  // deleteCaseStudy: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/case_study/case_study_overview",
  //     payload
  //   ),
  // //Case Study Content
  // addCSContentSecOne: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/case_study/case_study_details_1",
  //     payload,
  //     true
  //   ),
  // addCSContentSecTwo: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/case_study/case_study_details_2",
  //     payload,
  //     true
  //   ),
  // addCSContentSecThree: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/case_study/case_study_details_3",
  //     payload,
  //     true
  //   ),
  // addCSContentSecFour: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/case_study/case_study_details_4",
  //     payload,
  //     true
  //   ),
  // addCSContentSecFive: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/case_study/case_study_details_5",
  //     payload,
  //     true
  //   ),
  // addCSContentSecSix: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/case_study/case_study_details_6",
  //     payload,
  //     true
  //   ),
  // addCSContentSecSeven: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/case_study/case_study_details_7",
  //     payload,
  //     true
  //   ),
  // addCSContentSecEight: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/case_study/case_study_details_8",
  //     payload,
  //     true
  //   ),
  // getAllCSContent: (params) =>
  //   method.get(`api/cms/get_case_study_admin/${params}`),

  // //region Home
  // addHome: (payload) =>
  //   method.post("api/cms/insert_single/home/banner", payload, true),
  // getHome: () => method.get("api/cms/get_single/home/banner"),
  // //Services
  // addHCollab: (payload) =>
  //   method.post("api/cms/insert_multiple/home/collaborators", payload, true),
  // updateHCollab: (payload) =>
  //   method.post("api/cms/update_multiple/home/collaborators", payload, true),
  // getHCollab: () => method.get("api/cms/get_multiple/home/collaborators"),
  // deleteHCollab: (payload) =>
  //   method.post("api/cms/delete_multiple/home/collaborators", payload),
  // //Innovate One
  // addInOne: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple_in_single_request/home/innovative_service_1",
  //     payload,
  //     true
  //   ),
  // getInOne: () => method.get("api/cms/get_single/home/innovative_service_1"),
  // //Innovate Two
  // addInTwo: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple_in_single_request/home/innovative_service_2",
  //     payload,
  //     true
  //   ),
  // getInTwo: () => method.get("api/cms/get_single/home/innovative_service_2"),
  // //Industry Experience & Expertise
  // addIEE: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/home/industry_expertise",
  //     payload,
  //     true
  //   ),
  // updateIEE: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/home/industry_expertise",
  //     payload,
  //     true
  //   ),
  // getIEE: () => method.get("api/cms/get_multiple/home/industry_expertise"),
  // deleteIEE: (payload) =>
  //   method.post("api/cms/delete_multiple/home/industry_expertise", payload),
  // //What Our Customers Say
  // addCustomerSays: (payload) =>
  //   method.post("api/cms/insert_multiple/home/customers_says", payload, true),
  // updateCustomerSays: (payload) =>
  //   method.post("api/cms/update_multiple/home/customers_says", payload, true),
  // getCustomerSays: () => method.get("api/cms/get_multiple/home/customers_says"),
  // deleteCustomerSays: (payload) =>
  //   method.post("api/cms/delete_multiple/home/customers_says", payload),
  // //Why Choose us
  // addWhyChoose: (payload) =>
  //   method.post("api/cms/insert_single/home/why_choose_us", payload, true),
  // getWhyChoose: () => method.get("api/cms/get_single/home/why_choose_us"),
  // //Work Together
  // getWT: () => method.get("api/common/get_contact_details"),

  // //region About Us
  // addAboutus: (payload) =>
  //   method.post("api/cms/insert_single/about_us/au_banner", payload, true),
  // getAboutus: () => method.get("api/cms/get_single/about_us/au_banner"),
  // //Our Mission
  // addMission: (payload) =>
  //   method.post("api/cms/insert_single/about_us/our_mission_au", payload, true),
  // getMission: () => method.get("api/cms/get_single/about_us/our_mission_au"),
  // //Our Vision
  // addVision: (payload) =>
  //   method.post("api/cms/insert_single/about_us/our_vision_au", payload, true),
  // getVision: () => method.get("api/cms/get_single/about_us/our_vision_au"),
  // //Our Team
  // addTeam: (payload) =>
  //   method.post("api/cms/insert_multiple/about_us/au_team", payload, true),
  // updateTeam: (payload) =>
  //   method.post("api/cms/update_multiple/about_us/au_team", payload, true),
  // getTeam: () => method.get("api/cms/get_multiple/about_us/au_team"),
  // deleteTeam: (payload) =>
  //   method.post("api/cms/delete_multiple/about_us/au_team", payload),
  // //Location
  // addLocation: (payload) =>
  //   method.post("api/cms/insert_single/about_us/location_au", payload, true),
  // getLocation: () => method.get("api/cms/get_single/about_us/location_au"),

  // //region FAQs
  // addFAQs: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/faq_page/faq_page_banner",
  //     payload,
  //     true
  //   ),
  // getFAQs: () => method.get("api/cms/get_single/faq_page/faq_page_banner"),
  // //About BitTwoByte
  // addFAQBTB: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/faq_page/about_bittwobyte",
  //     payload,
  //     true
  //   ),
  // updateFAQBTB: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/faq_page/about_bittwobyte",
  //     payload,
  //     true
  //   ),
  // getFAQBTB: () => method.get("api/cms/get_multiple/faq_page/about_bittwobyte"),
  // deleteFAQBTB: (payload) =>
  //   method.post("api/cms/delete_multiple/faq_page/about_bittwobyte", payload),
  // //About Data & Beyond
  // addFAQDB: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/faq_page/about_data_and_beyond",
  //     payload,
  //     true
  //   ),
  // updateFAQDB: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/faq_page/about_data_and_beyond",
  //     payload,
  //     true
  //   ),
  // getFAQDB: () =>
  //   method.get("api/cms/get_multiple/faq_page/about_data_and_beyond"),
  // deleteFAQDB: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/faq_page/about_data_and_beyond",
  //     payload
  //   ),

  // //region Data Analytics
  // addDataAnalytics: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/data_analytics/da_banner",
  //     payload,
  //     true
  //   ),
  // getDataAnalytics: () =>
  //   method.get("api/cms/get_single/data_analytics/da_banner"),
  // //Services
  // addDAServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/data_analytics/data_analytics",
  //     payload,
  //     true
  //   ),
  // updateDAServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/data_analytics/data_analytics",
  //     payload,
  //     true
  //   ),
  // getDAServices: () =>
  //   method.get("api/cms/get_multiple/data_analytics/data_analytics"),
  // deleteDAServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/data_analytics/data_analytics",
  //     payload
  //   ),

  // //region Cloud Services
  // addCloud: (payload) =>
  //   method.post("api/cms/insert_single/cloud_service/cs_banner", payload, true),
  // getCloud: () => method.get("api/cms/get_single/cloud_service/cs_banner"),
  // //Services
  // addCloServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/cloud_service/cloud_services",
  //     payload,
  //     true
  //   ),
  // updateCloServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/cloud_service/cloud_services",
  //     payload,
  //     true
  //   ),
  // getCloServices: () =>
  //   method.get("api/cms/get_multiple/cloud_service/cloud_services"),
  // deleteCloServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/cloud_service/cloud_services",
  //     payload
  //   ),

  // //region Data Governance
  // addGovernance: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/data_governance/dg_banner",
  //     payload,
  //     true
  //   ),
  // getGovernance: () =>
  //   method.get("api/cms/get_single/data_governance/dg_banner"),
  // //Services
  // addDGServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/data_governance/data_governance_solutions",
  //     payload,
  //     true
  //   ),
  // updateDGServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/data_governance/data_governance_solutions",
  //     payload,
  //     true
  //   ),
  // getDGServices: () =>
  //   method.get(
  //     "api/cms/get_multiple/data_governance/data_governance_solutions"
  //   ),
  // deleteDGServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/data_governance/data_governance_solutions",
  //     payload
  //   ),

  // //region Data Engineering
  // addEngineering: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/data_engineering/de_banner",
  //     payload,
  //     true
  //   ),
  // getEngineering: () =>
  //   method.get("api/cms/get_single/data_engineering/de_banner"),
  // //Services
  // addDEServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/data_engineering/data_analytics_capabilities",
  //     payload,
  //     true
  //   ),
  // updateDEServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/data_engineering/data_analytics_capabilities",
  //     payload,
  //     true
  //   ),
  // getDEServices: () =>
  //   method.get(
  //     "api/cms/get_multiple/data_engineering/data_analytics_capabilities"
  //   ),
  // deleteDEServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/data_engineering/data_analytics_capabilities",
  //     payload
  //   ),

  // //region Data Science
  // addScience: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/data_science_services/dss_banner",
  //     payload,
  //     true
  //   ),
  // getScience: () =>
  //   method.get("api/cms/get_single/data_science_services/dss_banner"),
  // //Services
  // addSciServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/data_science_services/our_data_governance_solutions",
  //     payload,
  //     true
  //   ),
  // updateSciServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/data_science_services/our_data_governance_solutions",
  //     payload,
  //     true
  //   ),
  // getSciServices: () =>
  //   method.get(
  //     "api/cms/get_multiple/data_science_services/our_data_governance_solutions"
  //   ),
  // deleteSciServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/data_science_services/our_data_governance_solutions",
  //     payload
  //   ),

  // //region Supply Chain Management
  // addSupplyChain: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/scm_service_detail/scm_banner",
  //     payload,
  //     true
  //   ),
  // getSupplyChain: () =>
  //   method.get("api/cms/get_single/scm_service_detail/scm_banner"),
  // //Services
  // addSCMServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/scm_service_detail/scm_services",
  //     payload,
  //     true
  //   ),
  // updateSCMServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/scm_service_detail/scm_services",
  //     payload,
  //     true
  //   ),
  // getSCMServices: () =>
  //   method.get("api/cms/get_multiple/scm_service_detail/scm_services"),
  // deleteSCMServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/scm_service_detail/scm_services",
  //     payload
  //   ),
  // //region SCM - Management Consulting
  // addMCBanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/service_detail_page_3/sdp3_banner",
  //     payload,
  //     true
  //   ),
  // getMCBanner: () =>
  //   method.get("api/cms/get_single/service_detail_page_3/sdp3_banner"),
  // //Services
  // addMCServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/service_detail_page_3/our_management_consulting_services",
  //     payload,
  //     true
  //   ),
  // updateMCServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/service_detail_page_3/our_management_consulting_services",
  //     payload,
  //     true
  //   ),
  // getMCServices: () =>
  //   method.get(
  //     "api/cms/get_multiple/service_detail_page_3/our_management_consulting_services"
  //   ),
  // deleteMCServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/service_detail_page_3/our_management_consulting_services",
  //     payload
  //   ),
  // //region SCM - Implementation Services
  // addISanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/service_detail_page_3_5/sdp3_5_banner",
  //     payload,
  //     true
  //   ),
  // getISanner: () =>
  //   method.get("api/cms/get_single/service_detail_page_3_5/sdp3_5_banner"),
  // //Services
  // addISServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/service_detail_page_3_5/our_services_3_5",
  //     payload,
  //     true
  //   ),
  // updateIsServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/service_detail_page_3_5/our_services_3_5",
  //     payload,
  //     true
  //   ),
  // getISServices: () =>
  //   method.get("api/cms/get_multiple/service_detail_page_3_5/our_services_3_5"),
  // deleteISServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/service_detail_page_3_5/our_services_3_5",
  //     payload
  //   ),
  // //region SCM - Upgrade and Migration Services
  // addUMSBanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/service_detail_page_3_6/sdp3_6_banner",
  //     payload,
  //     true
  //   ),
  // getUMSBanner: () =>
  //   method.get("api/cms/get_single/service_detail_page_3_6/sdp3_6_banner"),
  // //Services
  // addUMSServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/service_detail_page_3_6/our_services_3_6",
  //     payload,
  //     true
  //   ),
  // updateUMSServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/service_detail_page_3_6/our_services_3_6",
  //     payload,
  //     true
  //   ),
  // getUMSServices: () =>
  //   method.get("api/cms/get_multiple/service_detail_page_3_6/our_services_3_6"),
  // deleteUMSServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/service_detail_page_3_6/our_services_3_6",
  //     payload
  //   ),
  // //region SCM - Managed Services
  // addMSBanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/service_detail_page_3_7/sdp3_7_banner",
  //     payload,
  //     true
  //   ),
  // getMSBanner: () =>
  //   method.get("api/cms/get_single/service_detail_page_3_7/sdp3_7_banner"),
  // //Services
  // addMSServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/service_detail_page_3_7/our_services_3_7",
  //     payload,
  //     true
  //   ),
  // updateMSServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/service_detail_page_3_7/our_services_3_7",
  //     payload,
  //     true
  //   ),
  // getMSServices: () =>
  //   method.get("api/cms/get_multiple/service_detail_page_3_7/our_services_3_7"),
  // deleteMSServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/service_detail_page_3_7/our_services_3_7",
  //     payload
  //   ),
  // //region SCM - Staffing IS IT Services
  // addStaffBanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/service_detail_page_3_8/sdp3_8_banner",
  //     payload,
  //     true
  //   ),
  // getStaffBanner: () =>
  //   method.get("api/cms/get_single/service_detail_page_3_8/sdp3_8_banner"),
  // //Services
  // addStaffServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/service_detail_page_3_8/our_services_3_8",
  //     payload,
  //     true
  //   ),
  // updateStaffServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/service_detail_page_3_8/our_services_3_8",
  //     payload,
  //     true
  //   ),
  // getStaffServices: () =>
  //   method.get("api/cms/get_multiple/service_detail_page_3_8/our_services_3_8"),
  // deleteStaffServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/service_detail_page_3_8/our_services_3_8",
  //     payload
  //   ),

  // //region Industries - Media and Entertainment
  // addMEBanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/media_and_entertainment/media_banner",
  //     payload,
  //     true
  //   ),
  // getMEBanner: () =>
  //   method.get("api/cms/get_single/media_and_entertainment/media_banner"),
  // // Services
  // addMEServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/media_and_entertainment/media_service",
  //     payload,
  //     true
  //   ),
  // updateMEServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/media_and_entertainment/media_service",
  //     payload,
  //     true
  //   ),
  // getMEServices: () =>
  //   method.get("api/cms/get_multiple/media_and_entertainment/media_service"),
  // deleteMEServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/media_and_entertainment/media_service",
  //     payload
  //   ),

  // //region Industries - Healthcare
  // addHCBanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/healthcare/healthcare_banner",
  //     payload,
  //     true
  //   ),
  // getHCBanner: () =>
  //   method.get("api/cms/get_single/healthcare/healthcare_banner"),
  // //Services
  // addHCServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/healthcare/healthcare_services",
  //     payload,
  //     true
  //   ),
  // updateHCServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/healthcare/healthcare_services",
  //     payload,
  //     true
  //   ),
  // getHCServices: () =>
  //   method.get("api/cms/get_multiple/healthcare/healthcare_services"),
  // deleteHCServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/healthcare/healthcare_services",
  //     payload
  //   ),

  // //region Industries - Banking
  // addBankBanner: (payload) =>
  //   method.post("api/cms/insert_single/banking/banking_banner", payload, true),
  // getBankBanner: () => method.get("api/cms/get_single/banking/banking_banner"),
  // //Services
  // addBankServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/banking/banking_services",
  //     payload,
  //     true
  //   ),
  // updateBankServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/banking/banking_services",
  //     payload,
  //     true
  //   ),
  // getBankServices: () =>
  //   method.get("api/cms/get_multiple/banking/banking_services"),
  // deleteBankServices: (payload) =>
  //   method.post("api/cms/delete_multiple/banking/banking_services", payload),

  // //region Industries - Retail
  // addRetailBanner: (payload) =>
  //   method.post("api/cms/insert_single/retail/retail_banner", payload, true),
  // getRetailBanner: () => method.get("api/cms/get_single/retail/retail_banner"),
  // //Services
  // addRetailServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/retail/retail_services",
  //     payload,
  //     true
  //   ),
  // updateRetailServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/retail/retail_services",
  //     payload,
  //     true
  //   ),
  // getRetailServices: () =>
  //   method.get("api/cms/get_multiple/retail/retail_services"),
  // deleteRetailServices: (payload) =>
  //   method.post("api/cms/delete_multiple/retail/retail_services", payload),

  // //region Industries - Manufacturing
  // addMFBanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/manufacturing/manufacturing_banner",
  //     payload,
  //     true
  //   ),
  // getMFBanner: () =>
  //   method.get("api/cms/get_single/manufacturing/manufacturing_banner"),
  // //Services
  // addMFServices: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/manufacturing/manufacturing_services",
  //     payload,
  //     true
  //   ),
  // updateMFServices: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/manufacturing/manufacturing_services",
  //     payload,
  //     true
  //   ),
  // getMFServices: () =>
  //   method.get("api/cms/get_multiple/manufacturing/manufacturing_services"),
  // deleteMFServices: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/manufacturing/manufacturing_services",
  //     payload
  //   ),

  // //region Technologies
  // addTechBanner: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/technology/technology_banner",
  //     payload,
  //     true
  //   ),
  // getTechBanner: () =>
  //   method.get("api/cms/get_single/technology/technology_banner"),
  // //Categories
  // addTechCategory: (payload) =>
  //   method.post("api/common/technologies/add", payload),
  // updateTechCategory: (payload) =>
  //   method.post("api/common/technologies/update", payload),
  // getTechCategory: () => method.get("api/common/technologies/get"),
  // deleteTechCategory: (payload) =>
  //   method.post("api/common/technologies/delete", payload),
  // //Add Technology
  // addTechImg: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/technology/technology_services",
  //     payload,
  //     true
  //   ),
  // updateTechImg: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/technology/technology_services",
  //     payload,
  //     true
  //   ),
  // getTechImg: () =>
  //   method.get("api/cms/get_multiple/technology/technology_services"),
  // deleteTechImg: (payload) =>
  //   method.post(
  //     "api/cms/delete_multiple/technology/technology_services",
  //     payload
  //   ),

  // //region Get in Touch
  // addGIT: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/get_in_touch/get_in_touch_banner",
  //     payload,
  //     true
  //   ),
  // getGIT: () =>
  //   method.get("api/cms/get_single/get_in_touch/get_in_touch_banner"),
  // //Schedule a call
  // addSAC: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/get_in_touch/schedule_a_call",
  //     payload,
  //     true
  //   ),
  // getSAC: () => method.get("api/cms/get_single/get_in_touch/schedule_a_call"),
  // //User Queries
  // addUQ: (payload) => method.post("api/queries/drop_a_note", payload),
  // getUQ: () => method.get("api/queries/drop_a_note"),

  // //region Careers
  // addCareer: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/contact_us_1/contact_us_1_banner",
  //     payload,
  //     true
  //   ),
  // getCareer: () =>
  //   method.get("api/cms/get_single/contact_us_1/contact_us_1_banner"),
  // //Career Oppourtunity
  // addCOpp: (payload) =>
  //   method.post(
  //     "api/cms/insert_multiple/contact_us_1/career_section",
  //     payload,
  //     true
  //   ),
  // updateCOpp: (payload) =>
  //   method.post(
  //     "api/cms/update_multiple/contact_us_1/career_section",
  //     payload,
  //     true
  //   ),
  // getCOpp: () => method.get("api/cms/get_multiple/contact_us_1/career_section"),
  // deleteCOpp: (payload) =>
  //   method.post("api/cms/delete_multiple/contact_us_1/career_section", payload),
  // //Jobs
  // getApplies: () => method.get("api/cms/get_multiple/apply_job_page/apply_job"),
  // deleteApplies: (payload) =>
  //   method.post("/api/cms/delete_multiple/apply_job_page/apply_job", payload),

  // //region Terms n Privacy policy
  // //Terms & Conditions
  // addTerms: (payload) =>
  //   method.post(
  //     "api/cms/insert_single/terms_and_conditions/terms_and_conditions",
  //     payload
  //   ),
  // getTerms: () =>
  //   method.get("api/cms/get_single/terms_and_conditions/terms_and_conditions"),

  // //Privacy Policy
  // addPrivacy: (payload) =>
  //   method.post("api/cms/insert_single/privacy_policy/privacy_policy", payload),
  // getPrivacy: () =>
  //   method.get("api/cms/get_single/privacy_policy/privacy_policy"),

  // //region Settings
  // //Topics & Countries
  // addTC: (payload) => method.post("api/common/update_settings", payload),
  // getTC: () => method.get("api/common/get_settings"),

  // //Search Keywords
  // addSearchKeyword: (payload) =>
  //   method.post("api/common/create_keyword", payload),
  // updateSearchKeyword: (payload) =>
  //   method.post("api/common/update_keyword", payload),
  // getSearchKeyword: () => method.get("api/common/get_keyword"),
};

export default apiFunctions;
