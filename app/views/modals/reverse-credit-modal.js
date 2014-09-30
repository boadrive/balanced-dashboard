import Ember from "ember";
import ModalBaseView from "./modal-base";
import ReverseCreditTransactionFactory from "balanced-dashboard/models/factories/reverse-credit-transaction-factory";

var ReverseCreditModalView = ModalBaseView.extend({
	classNameBindings: [":wide-modal", ":modal-overflow"],
	elementId: "reverse-credit",
	templateName: 'modals/reverse-credit-modal',
	title: "Reverse credit",

	model: function() {
		return ReverseCreditTransactionFactory.create({
			dollar_amount: this.get("credit.dollar_amount"),
			credit: this.get("credit")
		});
	}.property("credit"),

	customerDisplay: function() {
		var customer = this.get("credit.customer");

		if (customer) {
			var displayMe = customer.get("display_me");
			var email = customer.get("email");

			return Ember.isBlank(displayMe) ?
				displayMe :
				"%@ (%@)".fmt(displayMe, email);
		}
	}.property("credit.customer.display_me", "credit.customer.email"),

	isSaving: false,

	actions: {
		save: function() {
			var self = this;
			this.set("isSaving", true);
			this.get("model")
				.save()
				.then(function(model) {
					self.set("isSaving", false);
					self.get("controller").transitionToRoute(model.get("route_name"), model);
					self.close();
				}, function(errors) {
					self.set("isSaving", false);
				});
		},
	}
});

ReverseCreditModalView.reopenClass({
	open: function(credit) {
		return this.create({
			credit: credit
		});
	}
});

export default ReverseCreditModalView;