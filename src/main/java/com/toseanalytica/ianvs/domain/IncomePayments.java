package com.toseanalytica.ianvs.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A IncomePayments.
 */
@Entity
@Table(name = "income_payments")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class IncomePayments implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "amount_paid")
    private Float amountPaid;

    @Column(name = "amount_outstanding")
    private Float amountOutstanding;

    @Column(name = "outstanding_payment_date")
    private LocalDate outstandingPaymentDate;

    @ManyToOne
    @JsonIgnoreProperties("incomePayments")
    private IncomeCapture incomeCapture;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getAmountPaid() {
        return amountPaid;
    }

    public IncomePayments amountPaid(Float amountPaid) {
        this.amountPaid = amountPaid;
        return this;
    }

    public void setAmountPaid(Float amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Float getAmountOutstanding() {
        return amountOutstanding;
    }

    public IncomePayments amountOutstanding(Float amountOutstanding) {
        this.amountOutstanding = amountOutstanding;
        return this;
    }

    public void setAmountOutstanding(Float amountOutstanding) {
        this.amountOutstanding = amountOutstanding;
    }

    public LocalDate getOutstandingPaymentDate() {
        return outstandingPaymentDate;
    }

    public IncomePayments outstandingPaymentDate(LocalDate outstandingPaymentDate) {
        this.outstandingPaymentDate = outstandingPaymentDate;
        return this;
    }

    public void setOutstandingPaymentDate(LocalDate outstandingPaymentDate) {
        this.outstandingPaymentDate = outstandingPaymentDate;
    }

    public IncomeCapture getIncomeCapture() {
        return incomeCapture;
    }

    public IncomePayments incomeCapture(IncomeCapture incomeCapture) {
        this.incomeCapture = incomeCapture;
        return this;
    }

    public void setIncomeCapture(IncomeCapture incomeCapture) {
        this.incomeCapture = incomeCapture;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        IncomePayments incomePayments = (IncomePayments) o;
        if (incomePayments.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), incomePayments.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "IncomePayments{" +
            "id=" + getId() +
            ", amountPaid=" + getAmountPaid() +
            ", amountOutstanding=" + getAmountOutstanding() +
            ", outstandingPaymentDate='" + getOutstandingPaymentDate() + "'" +
            "}";
    }
}
