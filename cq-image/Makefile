.PHONY := lint check fix docker_lint jinja_lint python_lint_check shell_lint yaml_lint jinja_format_check python_format_check shell_format_check yaml_format_check jinja_format_fix python_lint_fix python_format_fix shell_format_fix yaml_format_fix help

all: 
	$(MAKE) -k lint check

lint:
	$(MAKE) -k docker_lint jinja_lint python_lint_check shell_lint yaml_lint

check:
	$(MAKE) -k jinja_format_check python_format_check shell_format_check yaml_format_check

fix: jinja_format_fix python_lint_fix python_format_fix shell_format_fix yaml_format_fix

define HELP_MESSAGE

make all: lint check
make lint: docker_lint jinja_lint python_lint_check shell_lint yaml_lint
make check: jinja_format_check python_format_check shell_format_check yaml_format_check
make fix: jinja_format_fix python_lint_fix python_format_fix shell_format_fix yaml_format_fix

Dockerfile: 		`hadolint`		https://github.com/hadolint/hadolint/wiki
Jinja:			`djlint`		https://www.djlint.com/docs/configuration/
Python:			`ruff`			https://docs.astral.sh/ruff/
Bash Linting:		`shellcheck`		https://www.shellcheck.net/wiki/Home
Bash Formatting:	`shfmt`			https://github.com/patrickvane/shfmt
YAML Linting:		`yamllint`		https://yamllint.readthedocs.io/en/stable/configuration.html
YAML Formatting:	`yamlfmt`		https://github.com/google/yamlfmt/tree/main/docs

endef

export HELP_MESSAGE

help: 
	@echo "$$HELP_MESSAGE"

docker_lint:
	RET=0; \
	for dockerfile in $$(bash -c 'find /code -name "Dockerfile"'); do \
		echo "Checking $$dockerfile:"; \
		hadolint $$dockerfile; \
		if [ $$? -ne 0 ]; then \
			RET=1; \
		fi; \
	done; \
	exit $$RET;

jinja_lint:
	RET=0;
	for jinjafile in $$(bash -c 'find /code -name "*.j2"'); do \
		djlint $$jinjafile --lint; \
		if [ $$? -ne 0 ]; then \
			RET=1; \
		fi; \
	done; \
	exit $$RET;

jinja_format_check:
	djlint /code --check --extension=j2 && \
	djlint /code --check --extension=html

jinja_format_fix:
	djlint /code --reformat --extension=j2 && \
	djlint /code --reformat --extension=html

python_lint_check:
	ruff check /code --output-format=github

python_lint_fix:
	ruff check /code --fix --output-format=github

python_format_check:
	ruff format /code --diff

python_format_fix:
	ruff format /code

shell_lint:
	RET=0;
	for shellfile in $$(bash -c 'find /code -name "*.sh"'); do \
		echo "Checking $$shellfile:"; \
		shellcheck $$shellfile ; \
		if [ $$? -ne 0 ]; then \
			RET=1; \
		fi; \
	done; \
	exit $$RET;

shell_format_check:
	shfmt -d /code

shell_format_fix:
	shfmt -w /code

yaml_lint:
	RET=0;
	for yamlfile in $$(bash -c 'find /code -name "*.yaml"'); do \
		echo "Checking $$yamlfile:"; \
		yamllint $$yamlfile ; \
		if [ $$? -ne 0 ]; then \
			RET=1; \
		fi; \
	done; \
	exit $$RET;

yaml_format_check:
	yamlfmt -dry /code 2>&1 | tee out.txt && \
	test -z "$$(cat out.txt)"

yaml_format_fix:
	yamlfmt /code
