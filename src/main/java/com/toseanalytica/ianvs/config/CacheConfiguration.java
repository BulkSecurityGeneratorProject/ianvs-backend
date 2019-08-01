package com.toseanalytica.ianvs.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.toseanalytica.ianvs.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Country.class.getName() + ".countryCounties", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Province.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Province.class.getName() + ".provinceTowns", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Town.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Town.class.getName() + ".branchTowns", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Company.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Company.class.getName() + ".branchCompanies", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Branch.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Branch.class.getName() + ".uploadBranches", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.Branch.class.getName() + ".captureBranches", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.CompanyCategory.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.CompanyCategory.class.getName() + ".companyCategories", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.CompanyStatus.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.CompanyStatus.class.getName() + ".companyStatuses", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.BranchStatus.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.BranchStatus.class.getName() + ".branchStatuses", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.ExpenseUpload.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.ExpenseStatus.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.ExpenseStatus.class.getName() + ".expenseStatuses", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.ExpenseCategory.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.ExpenseCategory.class.getName() + ".fileTypes", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.IncomeCapture.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.IncomeCapture.class.getName() + ".captureParents", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.IncomeCapture.class.getName() + ".incomePayments", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.IncomeCategory.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.IncomeCategory.class.getName() + ".captureCategories", jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.IncomeDetails.class.getName(), jcacheConfiguration);
            cm.createCache(com.toseanalytica.ianvs.domain.IncomePayments.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
