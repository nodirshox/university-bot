const Organization = require('../../models/Organization');
const dateFormat = require('dateformat');

exports.organizationAPI = {
    create: (req, res) => {
        res.render("./organization/create");
    },
    created: (req, res) => {
        const newDate = new Date();
        let newOrganization = {
            ...req.body,
            created_at: newDate,
            updated_at: newDate
        }
        if (newOrganization.is_active == 'on') {
            newOrganization.is_active = true;
        }
        Organization.create(newOrganization, (err, result) => {
            if(err) {
                return res.send({'message': JSON.stringify(err.message)});
            }
            return res.redirect('/organization');
        });
    },
    find: async (req, res) => {
        const filter = {
            deleted_at: null
        }
        const options = {
            sort: {
                created_at: -1
            }
        }
        const result = await Organization.find(filter, {}, options);
        res.render("./organization/list", { result })
    },
    get: async (req, res) => {
        const filter = {
            _id: req.params.id,
            deleted_at: null
        }
        const organization = await Organization.findOne(filter);
        
        let created_at = dateFormat(organization.created_at, "d-mmm yyyy, HH:MM");
        let updated_at = dateFormat(organization.updated_at, "d-mmm yyyy, HH:MM");

        return res.render("./organization/get", { organization, created_at, updated_at })
    },
    edit: async (req, res) => {
        const filter = {
            _id: req.params.id,
            deleted_at: null
        }
        const organization = await Organization.findOne(filter);

        res.render('./organization/edit', { organization });
    },
    edited: async (req, res) => {
        const filter = {
            _id: req.params.id,
            deleted_at: null
        }
        let update = {
            ...req.body
        }
        if (update.is_active == 'on') {
            update.is_active = true;
        } else {
            update.is_active = false;
        }
        update.updated_at = new Date();
        const result = await Organization.findOneAndUpdate(filter, update, { new: true });
        res.redirect('/organization/'+ req.params.id);
    },
    delete: async (req, res) => {
        const filter = {
            _id: req.params.id,
            deleted_at: null
        }
        const organization = await Organization.findOne(filter);

        res.render('./organization/delete', { organization });
    },
    deleted: async (req, res) => {
        const filter = {
            _id: req.params.id,
            deleted_at: null
        }
        const update = {
            deleted_at: new Date()
        }
        const result = await Organization.findOneAndUpdate(filter, update, { new: true });

        res.redirect('/organization');
    }
}