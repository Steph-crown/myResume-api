const mongoose = require('mongoose');

const schema = 
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'No `email` key in  request'],
            trim: true,
        },
        dashboard: {
            profiles: [
                {
                    personal: {
                        firstName: String,
                        lastName: String,
                        address: String,
                        city: String,
                        country: String,
                        postcode: String,
                        phone: String,
                        email: String,
                        profession: String,
                        socialLinks: [
                            {
                                media: String,
                                link: String
                            }
                        ]
                    },
                    work: [
                        {
                            title: String,
                            employer: String,
                            city: String,
                            country: String,
                            start: Date,
                            end: Date,
                            isCurrentlyWorking: Boolean,
                            details: String
                        }
                    ],
                    volunteer: [
                        {
                            title: String,
                            employer: String,
                            city: String,
                            country: String,
                            start: Date,
                            end: Date,
                            isCurrentlyWorking: Boolean,
                            details: String
                        }
                    ],
                    education: [
                        {
                            institutionName: String,
                            city: String,
                            qualification: String,
                            degree: String,
                            fieldOfStudy: String,
                            graduationDate: String,
                            description: String,
                            grade: String
                        }
                    ],
                    skills: {
                        list: [
                            {
                                name: String,
                                expertLevel: Number
                            }
                        ],
                        hideExpertLevel: Boolean
                    },
                    siteLinks: [
                        {
                            name: String,
                            link: String
                        }
                    ],
                    reference: [
                        {
                            name: String,
                            jobTitle: String,
                            company: String,
                            email: String,
                            phone: String
                        }
                    ],
                    projects: [
                        {
                            title: String,
                            description: String,
                            projectLinks: [
                                {
                                    name: String,
                                    link: String
                                }
                            ]
                        }
                    ],
                    customSection: {
                        title: String,
                        list: [
                            {
                                title: String,
                                details: String
                            }
                        ]
                    },
                    accomplishments: [String],
                    languages: [String],
                    affiliations: [String],
                    activities: [String],
                    publications: [String],
                    interests: [String],
                    certifications: [String],
                    professionalSummary: String,
                    additionalInformation: String
                }
            ],
            downloads: [
                {
                    image: String,
                    link: String,
                    doctype: String
                }
            ]
        }
    }

const dashboardSchema = mongoose.Schema(schema);

let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 
// Validates the email.
dashboardSchema.path('email').validate(function (email) {
    return emailRegex.test(email); // Assuming email has a text attribute
 }, 'The e-mail is not a valid e-mail.')


module.exports = mongoose.model('dashboard', dashboardSchema)